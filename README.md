# LynkHub

LynkHub é um aplicativo web desenvolvido com Next.js e Firebase que permite aos usuários gerenciar e compartilhar seus links favoritos.

## Funcionalidades

- **Autenticação de Usuário**: Registro e login de usuários utilizando Firebase Authentication.
- **Gerenciamento de Links**: Adicione, visualize e exclua links.
- **Perfis de Usuário**: Cada usuário tem um perfil público onde seus links são exibidos.
- **Interface Responsiva**: Design responsivo utilizando Tailwind CSS.

## Tecnologias Utilizadas

- **Next.js**: Framework React para desenvolvimento de aplicações web.
- **Firebase**: Plataforma de desenvolvimento de aplicativos móveis e web.
    - **Authentication**: Gerenciamento de autenticação de usuários.
    - **Firestore**: Banco de dados NoSQL para armazenamento de dados.
- **Tailwind CSS**: Framework CSS para estilização.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.

## Como Executar o Projeto

1. Clone o repositório:
        ```
        git clone https://github.com/seu-usuario/lynkhub.git
        ```
2. Instale as dependências:
        ```
        cd lynkhub
        npm install
        ```
3. Configure as variáveis de ambiente no arquivo `.env.local`.
        ```
        NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
        NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
        ```

4. Execute o servidor de desenvolvimento:
        ```
        npm run dev
        ```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
