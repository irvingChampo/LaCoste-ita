// Estas configuraciones deben coincidir con las configuraciones de tu backend
// o en su defecto a las direcciones de tu server desplegado
// -- Direcciones de desarrollo

const app_setting = {
    back_host: "127.0.0.1",
    back_port: 3030,
    back_protocol: 'http',
    back_uri: null
}

app_setting['back_uri'] = `${app_setting.back_protocol}://${app_setting.back_host}:${app_setting.back_port}`

export default app_setting;