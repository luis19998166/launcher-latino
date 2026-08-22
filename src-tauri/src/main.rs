// Evita que se abra una consola de Windows junto a la ventana en release.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    game_launcher_lib::run()
}
