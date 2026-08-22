#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        // Aqui iran los comandos del backend cuando toque conectar la logica real
        // (descargas, parcheo, login). Por ahora el launcher es solo front-end.
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error al arrancar la aplicacion Tauri");
}
