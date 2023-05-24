import Pianolatron from "./Pianolatron.svelte";
import LoadingSpinner from "./ui-components/LoadingSpinner.svelte";
import "./styles/styles.scss";

const scriptEl = document.currentScript;
const { assetsBase } = scriptEl.dataset;

let props = { assetsBase };
let keys = [ "autoPlay", "skipWelcomeDialog", "noLeft", "noRight", "hideAdvancedSettings"];
for ( const k of keys ) {
    if ( k in scriptEl.dataset) props = { ...props, [k]: true };
}

let { theme } = JSON.parse(window.localStorage.getItem("userSettings")) || {};
if (!theme) {
    theme = scriptEl.dataset["theme"];
}
theme && document.documentElement.setAttribute("data-theme", theme);


const div = document.createElement("div");
div.id = "app-wrapper";
const spinnerEl = document.createElement("div");
spinnerEl.id = "spinner-wrapper";
scriptEl.parentNode.insertBefore(div, scriptEl);
scriptEl.parentNode.insertBefore(spinnerEl, scriptEl);

const runApp = function () {

    new LoadingSpinner({
        target: spinnerEl,
        props: {
            showLoadingSpinner:true,
            loadingSpinnerText:"Loading application..."
        }
    });

    new Pianolatron({
        target: div,
        props
    });
}

document.addEventListener('DOMContentLoaded', runApp );