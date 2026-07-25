---
title: OnlineScales
slug: onlinescales
summary: Передача показаний весов и датчиков с ESP32 в облако через VK Callback API.
tags: [ESP32, "Yandex Cloud Functions", YDB, "VK Callback API"]
githubUrl: https://github.com/Al-Zhilin
date: "2026-01-01"
---

Система передачи показаний весов и датчиков с ESP32 в облачную инфраструктуру.

## Как это работает

1. **ESP32** снимает показания с весов/датчиков
2. Данные отправляются через **VK Callback API**
3. Обработка происходит в **Yandex Cloud Functions**
4. Результаты сохраняются в **YDB**
