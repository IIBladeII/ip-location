import { useState, useEffect, useCallback } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    loading: false,
    supported: false
  });

  const [watchId, setWatchId] = useState(null);

  // Verificar se geolocalização é suportada
  useEffect(() => {
    setLocation(prev => ({
      ...prev,
      supported: 'geolocation' in navigator
    }));
  }, []);

  // Função para obter localização uma vez
  const getCurrentPosition = useCallback((options = {}) => {
    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutos
      ...options
    };

    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: 'Geolocalização não é suportada por este navegador',
        loading: false
      }));
      return Promise.reject(new Error('Geolocation not supported'));
    }

    setLocation(prev => ({ ...prev, loading: true, error: null }));

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            error: null,
            loading: false,
            supported: true,
            timestamp: position.timestamp
          };
          
          setLocation(newLocation);
          resolve(newLocation);
        },
        (error) => {
          const errorMessage = getErrorMessage(error.code);
          const errorState = {
            latitude: null,
            longitude: null,
            accuracy: null,
            error: errorMessage,
            loading: false,
            supported: true,
            code: error.code
          };
          
          setLocation(errorState);
          reject(new Error(errorMessage));
        },
        defaultOptions
      );
    });
  }, []);

  // Função para observar mudanças na localização
  const watchPosition = useCallback((options = {}) => {
    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000, // 1 minuto para watch
      ...options
    };

    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: 'Geolocalização não é suportada por este navegador'
      }));
      return null;
    }

    // Limpar watch anterior se existir
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
    }

    setLocation(prev => ({ ...prev, loading: true, error: null }));

    const id = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          error: null,
          loading: false,
          supported: true,
          timestamp: position.timestamp,
          heading: position.coords.heading,
          speed: position.coords.speed
        });
      },
      (error) => {
        setLocation(prev => ({
          ...prev,
          error: getErrorMessage(error.code),
          loading: false,
          code: error.code
        }));
      },
      defaultOptions
    );

    setWatchId(id);
    return id;
  }, [watchId]);

  // Função para parar de observar a localização
  const clearWatch = useCallback(() => {
    if (watchId && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  }, [watchId]);

  // Limpar watch quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (watchId && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  // Função para obter mensagem de erro amigável
  const getErrorMessage = (code) => {
    switch (code) {
      case 1:
        return 'Permissão de localização negada. Por favor, permita o acesso à localização.';
      case 2:
        return 'Localização indisponível. Verifique se o GPS está ativado.';
      case 3:
        return 'Timeout na obtenção da localização. Tente novamente.';
      default:
        return 'Erro desconhecido ao obter localização.';
    }
  };

  // Função para calcular distância entre duas coordenadas
  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distância em km
  }, []);

  // Função para formatar coordenadas
  const formatCoordinates = useCallback((lat, lng, precision = 6) => {
    if (!lat || !lng) return null;
    return {
      latitude: parseFloat(lat).toFixed(precision),
      longitude: parseFloat(lng).toFixed(precision),
      formatted: `${parseFloat(lat).toFixed(precision)}, ${parseFloat(lng).toFixed(precision)}`
    };
  }, []);

  // Função para obter informações de precisão
  const getAccuracyInfo = useCallback((accuracy) => {
    if (!accuracy) return null;
    
    let level = 'unknown';
    let description = '';
    let color = '#6c757d';

    if (accuracy < 10) {
      level = 'excellent';
      description = 'Excelente';
      color = '#28a745';
    } else if (accuracy < 50) {
      level = 'good';
      description = 'Boa';
      color = '#20c997';
    } else if (accuracy < 100) {
      level = 'fair';
      description = 'Razoável';
      color = '#ffc107';
    } else if (accuracy < 1000) {
      level = 'poor';
      description = 'Baixa';
      color = '#fd7e14';
    } else {
      level = 'very-poor';
      description = 'Muito Baixa';
      color = '#dc3545';
    }

    return {
      level,
      description,
      color,
      meters: Math.round(accuracy),
      formatted: accuracy < 1000 ? `${Math.round(accuracy)}m` : `${(accuracy / 1000).toFixed(1)}km`
    };
  }, []);

  return {
    ...location,
    getCurrentPosition,
    watchPosition,
    clearWatch,
    calculateDistance,
    formatCoordinates,
    getAccuracyInfo,
    isWatching: watchId !== null
  };
};

export default useGeolocation;