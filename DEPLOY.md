# 🚀 Guia de Deploy - IP Location Finder

Este guia contém instruções detalhadas para fazer o deploy do projeto no GitHub e Vercel.

## 📋 Pré-requisitos

- [x] Node.js 16+ instalado
- [x] Conta no GitHub
- [x] Conta no Vercel
- [x] Git configurado localmente

## 🔧 Preparação do Projeto

### 1. Verificar se tudo está funcionando

```bash
# Instalar dependências
npm install

# Testar localmente
npm start

# Fazer build de produção
npm run build
```

### 2. Verificar arquivos importantes

- [x] `package.json` - Configurações do projeto
- [x] `vercel.json` - Configuração do Vercel
- [x] `.gitignore` - Arquivos ignorados pelo Git
- [x] `README.md` - Documentação principal
- [x] `LICENSE` - Licença MIT

## 📤 Deploy no GitHub

### 1. Criar repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique em "New repository"
3. Nome: `ip-location-finder`
4. Descrição: `IP Location Finder - Descubra a localização de qualquer IP ou domínio`
5. Marque como público
6. **NÃO** inicialize com README (já temos um)

### 2. Conectar projeto local ao GitHub

```bash
# Inicializar Git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit inicial
git commit -m "feat: initial commit - IP Location Finder v1.0.0"

# Adicionar origin remoto (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/ip-location-finder.git

# Fazer push para o GitHub
git push -u origin main
```

### 3. Configurar GitHub Pages (opcional)

1. Vá para Settings > Pages
2. Source: Deploy from a branch
3. Branch: `main` / `build`
4. Clique em Save

## 🌐 Deploy no Vercel

### Método 1: Via GitHub (Recomendado)

1. **Conectar GitHub ao Vercel**

   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub
   - Clique em "New Project"
   - Selecione o repositório `ip-location-finder`

2. **Configurar o projeto**

   - Framework Preset: `Create React App`
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Variáveis de ambiente (se necessário)**

   - Não são necessárias para este projeto
   - APIs usadas são públicas

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde o build completar
   - Seu site estará disponível em: `https://ip-location-finder.vercel.app`

### Método 2: Via Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login no Vercel
vercel login

# Deploy do projeto
vercel

# Para deploy de produção
vercel --prod
```

## 🔧 Configurações Avançadas

### Custom Domain (Opcional)

1. No dashboard do Vercel, vá para Settings > Domains
2. Adicione seu domínio personalizado
3. Configure DNS conforme instruções

### Environment Variables

```bash
# No Vercel Dashboard > Settings > Environment Variables
# (Não necessário para este projeto)
```

### Analytics

1. Vá para Analytics no dashboard
2. Ative o Vercel Analytics
3. Monitore performance e visitantes

## 📊 Monitoramento

### Vercel Analytics

- Pageviews e visitantes únicos
- Performance metrics
- Core Web Vitals

### GitHub Insights

- Traffic e clones
- Issues e pull requests
- Dependabot alerts

## 🔄 Atualizações Futuras

### Workflow de desenvolvimento

```bash
# Criar nova branch para feature
git checkout -b feature/nova-funcionalidade

# Fazer mudanças e commits
git add .
git commit -m "feat: adiciona nova funcionalidade"

# Push da branch
git push origin feature/nova-funcionalidade

# Criar Pull Request no GitHub
# Após aprovação, merge para main
# Vercel fará deploy automático
```

### Versionamento

```bash
# Atualizar versão no package.json
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# Push das tags
git push --tags
```

## 🐛 Troubleshooting

### Build Errors

```bash
# Limpar cache
npm run build -- --reset-cache

# Verificar dependências
npm audit
npm audit fix
```

### Deploy Errors

- Verificar logs no Vercel Dashboard
- Confirmar se build local funciona
- Verificar configurações do vercel.json

### Performance Issues

- Usar Vercel Analytics
- Otimizar imagens
- Implementar lazy loading

## 📞 Suporte

- **GitHub Issues**: Para bugs e features
- **Vercel Support**: Para problemas de deploy
- **Email**: pedroworkdev@gmail.com

## ✅ Checklist Final

- [ ] Projeto funcionando localmente
- [ ] Build de produção sem erros
- [ ] Repositório criado no GitHub
- [ ] Código enviado para GitHub
- [ ] Deploy configurado no Vercel
- [ ] Site acessível na URL do Vercel
- [ ] README.md atualizado com URLs
- [ ] Domínio personalizado (opcional)

---

🎉 **Parabéns! Seu IP Location Finder está no ar!**

Compartilhe o link: `https://ip-location-finder.vercel.app`
