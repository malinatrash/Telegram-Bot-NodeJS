const TelegramApi = require('node-telegram-bot-api')
const token = '6056777966:AAEY135JblK0EUlFoG-W38GvZt7F126RO4s'
const bot = new TelegramApi(token, {polling: true})

const gameKeyboard = [
    [{text: '🗿'}, {text: '✂'}], [{text: '🧻'}]
]

const menuKeyboard = [
    [{text: 'Начать игру'}, {text: 'Иноформация'}], [{text: '🧻'}]
]

const STONE = "STONE"
const CUTTER = "CUTTER"
const PAPER = "PAPER"

const start = () => {
    bot.on('message', msg => {
        const text = msg.text
        const chatId = msg.chat.id

        switch (text) {
            case '/start':
                const helloText = 'Welcome to malinatrash`s TelegramBot'
                bot.sendSticker(chatId, "https://tlgrm.eu/_/stickers/1b5/0ab/1b50abf8-8451-40ca-be37-ffd7aa74ec4d/10.webp").then(r => {
                })
                return bot.sendMessage(
                    chatId,
                    helloText,
                    { reply_markup: {
                            keyboard: menuKeyboard,
                            one_time_keyboard: true
                        }
                    })
            case "/game":
                bot.sendMessage(
                    chatId,
                    'Выберите действие',
                    { reply_markup: {
                        keyboard: gameKeyboard,
                        one_time_keyboard: true
                    }
                })
                break
            case "🗿":
                startGame("🗿", chatId)
                break
            case "✂️":
                startGame("✂️", chatId)
                break
            case "🧻":
                startGame("🧻", chatId)
                break
            default:
                bot.sendMessage(chatId, "Неизвестнавя команда").then(r => {
                })

        }
    })
}

const startGame = (value, chatId) => {
    let res
    switch (value) {
        case "✂️":
            res = CUTTER
            break
        case "🗿":
            res = STONE
            break
        default:
            res = PAPER
            break
    }
    let bot_res
    switch (Math.floor(Math.random() * 3) + 1) {
        case 1:
            bot_res = STONE
            break
        case 2:
            bot_res = CUTTER
            break
        default:
            bot_res = PAPER
    }
    if (bot_res === res) {
        bot.sendMessage("Ничья")
        return
    }
    if (bot_res === PAPER && res === STONE) {
        bot.sendMessage(chatId, "Ты проиграл!")
    } else if (bot_res === PAPER && res === CUTTER) {
        bot.sendMessage(chatId, "Ты выиграл!")
    } else if (bot_res === STONE && res === CUTTER) {
        bot.sendMessage(chatId, "Ты проиграл!")
    } else if (bot_res === STONE && res === PAPER) {
        bot.sendMessage(chatId, "Ты выиграл!")
    } else if (bot_res === CUTTER && res === PAPER) {
        bot.sendMessage(chatId, "Ты проиграл!")
    }  else if (bot_res === CUTTER && res === STONE) {
        bot.sendMessage(chatId, "Ты выиграл!")
    }
}

start()