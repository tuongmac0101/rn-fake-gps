# COMMANDS

Link docs: https://docs.expo.dev/eas/environment-variables

### Show list command

```bash
    eas env --help
```

- env:create create an environment variable for the current project or account
- env:delete delete an environment variable for the current project or account
- env:exec execute a command with environment variables from the selected environment
- env:get view an environment variable for the current project or account
- env:list list environment variables for the current project or account
- env:pull pull environment variables for the selected environment to .env file
- env:push push environment variables from .env file to the selected environment
- env:update update an environment variable on the current project or account

# EXAMPLE

### Pull env về máy local (tạo file .env)

```bash
eas env:pull --environment development --non-interactive
eas env:pull --environment preview --non-interactive
eas env:pull --environment production --non-interactive
```

### Push env từ file .env lên EAS

```bash
eas env:push --environment development
eas env:push --environment preview
eas env:push --environment production
```
