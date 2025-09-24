# 🌍 IP Location Finder

Uma aplicação web moderna e elegante para descobrir a localização geográfica de qualquer endereço IP ou domínio no mundo.

![IP Location Finder](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Styled Components](https://img.shields.io/badge/Styled--Components-6.1.1-pink?style=for-the-badge&logo=styled-components)
![Framer Motion](https://img.shields.io/badge/Framer--Motion-10.16.4-purple?style=for-the-badge&logo=framer)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-green?style=for-the-badge&logo=leaflet)

## ✨ Características

- 🎯 **Busca Precisa**: Localização exata de IPs e domínios
- 🗺️ **Mapa Interativo**: Visualização em mapa com Leaflet
- 📱 **Design Responsivo**: Funciona perfeitamente em todos os dispositivos
- 🎨 **Interface Moderna**: Design elegante com animações suaves
- ⚡ **Performance Otimizada**: Carregamento rápido e eficiente
- 🌐 **Suporte Multilíngua**: Interface em português brasileiro
- 🔍 **Detecção Automática**: Encontra automaticamente seu IP atual

## 🚀 Demonstração

[Ver Demo ao Vivo](https://ip-location-finder.vercel.app)

## 📋 Funcionalidades

### 🔍 Busca de IP/Domínio
- Busca por endereço IP (IPv4/IPv6)
- Busca por nome de domínio
- Validação automática de entrada
- Tratamento de erros elegante

### 📊 Informações Detalhadas
- **Localização**: País, região, cidade
- **Coordenadas**: Latitude e longitude
- **Provedor**: ISP e organização
- **Timezone**: Fuso horário local
- **Código Postal**: CEP da região

### 🗺️ Visualização no Mapa
- Mapa interativo com Leaflet
- Marcador preciso da localização
- Zoom automático para a região
- Controles de navegação intuitivos

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18.2.0** - Biblioteca JavaScript para interfaces
- **Styled Components 6.1.1** - CSS-in-JS para estilização
- **Framer Motion 10.16.4** - Animações e transições
- **React Leaflet 4.2.1** - Mapas interativos
- **React Icons 4.12.0** - Ícones modernos
- **Axios 1.6.2** - Cliente HTTP para APIs

### APIs
- **ipapi.co** - Geolocalização de IP principal
- **Google DNS** - Resolução de domínios
- **OpenStreetMap** - Tiles do mapa

## 📦 Instalação

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/Pedro-Dev/ip-location-finder.git
cd ip-location-finder
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute o projeto**
```bash
npm start
# ou
yarn start
```

4. **Acesse no navegador**
```
http://localhost:3000
```

## 🏗️ Build para Produção

```bash
# Build otimizado
npm run build

# Servir localmente para teste
npm run analyze
```

## 📁 Estrutura do Projeto

```
ip-location-finder/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── SearchContainer.js
│   │   ├── ResultContainer.js
│   │   ├── MapComponent.js
│   │   ├── LoadingSpinner.js
│   │   └── Footer.js
│   ├── hooks/
│   │   └── useGeolocation.js
│   ├── services/
│   │   └── ipService.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## 🎨 Customização

### Cores do Tema
```javascript
// Cores principais
const colors = {
  primary: '#4a90e2',
  secondary: '#17a2b8',
  success: '#28a745',
  background: '#0a1929',
  surface: '#1a2a3d'
};
```

### Configuração do Mapa
```javascript
// Configurações do Leaflet
const mapConfig = {
  defaultZoom: 10,
  maxZoom: 18,
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
};
```

## 🔧 Configuração de APIs

O projeto utiliza APIs públicas que não requerem chave de API:
- **ipapi.co**: Limite de 1000 requisições/dia
- **Google DNS**: Sem limite para uso pessoal

Para uso em produção com maior volume, considere:
- Upgrade para plano pago do ipapi.co
- Implementação de cache local
- Rate limiting no frontend

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente (se necessário)
3. Deploy automático a cada push

### Netlify
1. Build command: `npm run build`
2. Publish directory: `build`
3. Deploy automático configurado

### Outras Plataformas
- **GitHub Pages**: Suporte completo
- **Firebase Hosting**: Configuração simples
- **AWS S3**: Para hospedagem estática

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Pedro Riccio**
- Portfolio: [pedroriccio.vercel.app](https://pedroriccio.vercel.app)
- GitHub: [@Pedro-Dev](https://github.com/Pedro-Dev)
- Email: pedroworkdev@gmail.com

## 🙏 Agradecimentos

- [ipapi.co](https://ipapi.co) pela API de geolocalização
- [OpenStreetMap](https://openstreetmap.org) pelos tiles do mapa
- [React](https://reactjs.org) pela incrível biblioteca
- [Leaflet](https://leafletjs.com) pelo sistema de mapas

---

⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub!