import '@logseq/libs'
import { setCORS } from 'google-translate-api-browser'
import {
        initSettings,
        getSettings
} from "./common/funcs";

// setting up cors-anywhere server address
const translate = setCORS('https://thingproxy.freeboard.io/fetch/')

/**
 * main entry
 */
async function main () {
        // settings
  initSettings();
        const settings = getSettings();
        logseq.App.showMsg('hello, I am a translator :p')
                /*        declare const to 
  const to="zh-TW"
                 */

  logseq.Editor.onInputSelectionEnd((e) => {
    const { x, y } = e.point
    const dsl = (text: string, text2: string = '') => {
      return {
        key: 'selection-end-text-dialog',
        close: 'outside',
        template: `
        <div style="padding: 10px; overflow: auto;">
            <div style="
    font-size: 20px;
    font-weight: bolder;
    margin-top: 6px;
">${text}</div>
          
            <div style="
    font-size: 18px;
    margin-top: 6px;
">${text2}</div>
            <div style="
    font-size: 18px;
    margin: 6px 0;
">
<a href="https://translate.google.com/?sl=auto&tl=${settings.myLanguage}&text=${text}&op=translate">More »</a></div>

       </div>
      `,
        style: {
          left: x + 'px',
          top: y + 'px',
          width: '300px',
          backgroundColor: 'var(--ls-primary-background-color)',
          color: 'var(--ls-primary-text-color)',
          boxShadow: '1px 2px 5px var(--ls-secondary-background-color)',
        },
        attrs: {
          title: 'logseq-translate-plugin',
        },
      }
    }

    logseq.provideUI(dsl('Loading...'))

    translate(e.text, { to: settings.myLanguage }).then((res) => {
      //@ts-ignore
      logseq.provideUI(dsl(e.text, decodeURIComponent(res.text)))
    }).catch((e) => {
      logseq.provideUI(dsl('ERROR'))
      console.error(e)
    })
  })
}

// bootstrap
logseq.ready(main).catch(console.error)
