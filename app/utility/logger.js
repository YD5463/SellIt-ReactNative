import Bugsnag from "@bugsnag/expo";

const log = (error) => console.log(error); //Bugsnag.notify(error);
const init = () => Bugsnag.start();

export default { log, init };
