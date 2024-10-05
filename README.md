# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

Admin Pages:
When creating an admin dashboard, the specific pages you need can vary depending on the requirements of your application. However, here are some common pages that are often included in an admin dashboard:

Chat

Dashboard: This is the main page that provides an overview of the key metrics and statistics of your application.

User Management: This page allows the admin to view, add, edit, and delete users.

Role Management: This page allows the admin to manage the roles and permissions of users.

Content Management: If your application involves content creation (like blog posts or product listings), this page allows the admin to manage that content.

Reports: This page displays various reports related to the application's performance, user activity, etc.

Settings: This page allows the admin to manage various settings related to the application.

Notifications: This page allows the admin to manage and send notifications or messages to users.

Audit Logs: This page displays a log of all activities performed in the admin dashboard.

Remember, these are just suggestions. The specific pages you need will depend on the requirements of your application.
