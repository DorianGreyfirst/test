const { Telegraf, Markup} = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
//bot.start((ctx) => console.log(ctx.message))
bot.start((ctx) => ctx.reply(`Доброго дня ${ctx.message.from.first_name ? ctx.message.from.first_name : 'Незнайомець'}!`))
bot.help((ctx) => ctx.reply(text.commands))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.command('course', async (ctx) => {   //команда для бота
    try {
        await ctx.replyWithHTML('<b>Курси</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редактори', 'btn_1'), Markup.button.callback('Обзори', 'btn_2')],
                [Markup.button.callback('Редактори', 'btn_3')]
            ]
        ))
    } catch(e) {
        console.error(e)
    }
    
})

function addActionBot(name, src, text){    //функция обработки кнопок
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if(src !==false) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
            disable_web_page_preview: true
          })  
        } catch (e) {
            console.error(e)
        }
    })
}
addActionBot('btn_1', './img/1.jpg', text.text1)  //действие на кнопку
addActionBot('btn_2', './img/2.jpg', text.text2)
addActionBot('btn_3', false, text.text3)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))