// Função para verificar se é um domínio
const isDomain = query => {
  const domainRegex =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  return domainRegex.test(query);
};

// Função para buscar IP por query (IP ou domínio)
export const searchIP = async query => {
  if (!query || !query.trim()) {
    throw new Error('Por favor, digite um IP ou domínio válido');
  }

  const trimmedQuery = query.trim();

  try {
    if (isDomain(trimmedQuery)) {
      // Primeiro resolve o domínio para IP
      const dnsResponse = await fetch(
        `https://dns.google/resolve?name=${trimmedQuery}`
      );
      const dnsData = await dnsResponse.json();

      if (!dnsData.Answer || !dnsData.Answer[0]) {
        throw new Error('Domínio não pôde ser resolvido');
      }

      const resolvedIP = dnsData.Answer[0].data;

      // Busca informações do IP resolvido
      const ipResponse = await fetch(`https://ipapi.co/${resolvedIP}/json/`);
      const ipData = await ipResponse.json();

      if (ipData.error) {
        throw new Error('Localização não encontrada para este domínio');
      }

      return {
        ...ipData,
        domain: trimmedQuery,
        resolvedIP,
      };
    } else {
      // Processa como IP diretamente
      const response = await fetch(`https://ipapi.co/${trimmedQuery}/json/`);
      const data = await response.json();

      if (data.error) {
        throw new Error('IP não encontrado ou inválido');
      }

      return data;
    }
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error(
        'Erro de conexão. Verifique sua internet e tente novamente.'
      );
    }
    throw error;
  }
};

// Função para obter localização do usuário
export const getMyLocation = async () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          try {
            // Sucesso - usuário permitiu a localização
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();

            if (data.error) {
              throw new Error('Não foi possível obter informações do IP');
            }

            // Atualiza as coordenadas com a localização real do usuário
            resolve({
              ...data,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              userLocation: true,
            });
          } catch (error) {
            reject(new Error('Erro ao obter informações de localização'));
          }
        },
        async error => {
          // eslint-disable-next-line no-console
          console.warn('Erro de geolocalização:', error);

          try {
            // Fallback para IP apenas
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();

            if (data.error) {
              throw new Error('Não foi possível obter informações do IP');
            }

            resolve({
              ...data,
              userLocation: false,
              locationError: getLocationErrorMessage(error.code),
            });
          } catch (fallbackError) {
            reject(new Error('Erro ao obter informações de localização'));
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutos
        }
      );
    } else {
      // Geolocalização não suportada - usar apenas IP
      fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            throw new Error('Não foi possível obter informações do IP');
          }

          resolve({
            ...data,
            userLocation: false,
            locationError: 'Geolocalização não suportada pelo navegador',
          });
        })
        .catch(error => {
          reject(new Error('Erro ao obter informações de localização'));
        });
    }
  });
};

// Função para obter mensagem de erro de localização
const getLocationErrorMessage = code => {
  switch (code) {
    case 1:
      return 'Permissão de localização negada pelo usuário';
    case 2:
      return 'Localização indisponível';
    case 3:
      return 'Timeout na obtenção da localização';
    default:
      return 'Erro desconhecido na obtenção da localização';
  }
};

// Função para validar IP
export const isValidIP = ip => {
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
};

// Função para formatar dados de localização
export const formatLocationData = data => {
  return {
    ip: data.ip || '-',
    location:
      data.latitude && data.longitude
        ? `${data.latitude.toFixed(6)}, ${data.longitude.toFixed(6)}`
        : '-',
    isp: data.org || data.isp || '-',
    country: data.country_name || '-',
    city: data.city || '-',
    timezone: data.timezone || '-',
    region: data.region || '-',
    postal: data.postal || '-',
    latitude: data.latitude || 0,
    longitude: data.longitude || 0,
    domain: data.domain || null,
    resolvedIP: data.resolvedIP || null,
    userLocation: data.userLocation || false,
    accuracy: data.accuracy || null,
    locationError: data.locationError || null,
  };
};
