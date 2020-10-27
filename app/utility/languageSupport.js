import * as Localization from "expo-localization";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";

const init = () => {
  // Set the key-value pairs for the different languages you want to support.
  i18n.use(initReactI18next).init(
    {
      lng: Localization.locale,
      fallbackLng: ["en", "he"],
      resources: {
        en: {
          translation: {
            login: "Login",
            register: "Register",
            logout: "Log Out",
            feed: "Feed",
            account: "My Account",
            myListings: "My Listings",
            myMessages: "My Messages",
            myActivity: "My Activity",
            settings: "Settings",
            password: "Password",
            language: "Language",
            help: "Help",
            about: "About",
            theme: "Theme",
            light: "Light",
            dark: "Dark",
            average_title: "Daily Average",
            average_description:
              "Average time you spent per day using the SellIt app on this device in the last week",
            m: "m",
            h: "h",
            save: "Save",
            new_password: "New password",
            new_password_again: "New password, Again",
            current_password: "Current password",
            Name: "Name",
            Bio: "Bio",
            "E-mail Address": "E-mail Address",
            "Phone Number": "Phone Number",
          },
        },
        he: {
          translation: {
            login: "התחבר",
            register: "הירשם",
            logout: "התנתק",
            feed: "דף הבית",
            account: "החשבון שלי",
            myListings: "הרשימה שלי",
            myMessages: "ההודעות שלי",
            myActivity: "הפעילות שלי",
            settings: "הגדרות",
            password: "סיסמא",
            language: "שפה",
            about: "עלינו",
            help: "עזרה",
            theme: "רקע",
            light: "בהיר",
            dark: "כהה",
            average_title: "ממוצע יומי",
            average_description:
              "הזמן הממוצע שבילית באפליקצייה במכשיר זה בשבוע האחרון בכל יום",
            m: "ד",
            h: "ש",
            save: "שמור",
            new_password: "הסיסמא החדשה",
            new_password_again: "הסיסמא החדשה,שוב",
            current_password: "הסיסמא הנוכחית",
            Name: "שם",
            Bio: "",
            "E-mail Address": 'כתובת דוא"ל',
            "Phone Number": "מספר טלפון",
          },
        },
      },
    },
    (err, t) => console.log("init done error is:", err)
  );
};
export default { init };
