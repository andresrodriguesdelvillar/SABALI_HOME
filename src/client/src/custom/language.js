export const register = {
  english: {
    title: "Register",
    name: {
      label: "Name",
      errors: {
        length: "the name needs to be at least 3 characters long",
        symbols:
          "the name can only contain latin-letters and the following symbols (_, -, &)"
      }
    },
    company: {
      label: "Company",
      errors: {
        symbols:
          "the company name can only contain latin-letters and the following symbols (_, -, &)"
      }
    },
    email: {
      label: "Email",
      errors: { default: "That is not a valid Email adress" }
    },
    password: {
      label: "Password",
      errors: {
        length: "The password needs to contain at least 8 characters",
        uppercase: "The password needs to contain at least one c letter",
        symbol: "The password needs to contain at least one number or symbol"
      }
    },
    confPass: {
      label: "Confirm Password",
      errors: {
        default: "The password confirmation does not match the password"
      }
    },
    submitButton: "Register"
  },
  deutsch: {
    title: "Anmelden",
    name: {
      label: "Name",
      errors: {
        length: "Der Name muss mindestens 3 Zeichen enthalten",
        symbols:
          "Der Name darf nur lateinische Buchstaben und die folgenden Symbole enthalten (_, -, &)"
      }
    },
    company: {
      label: "Firma",
      errors: {
        symbols:
          "Der Firmen-Name darf nur lateinische Buchstaben und die folgenden Symbole enthalten (_, -, &)"
      }
    },
    email: {
      label: "Email",
      errors: { default: "Das ist keine gültige Email adresse" }
    },
    password: {
      label: "Passwort",
      errors: {
        length: "Das Passwort muss mindestens 8 Zeichen enthalten",
        uppercase:
          "Das Passwort muss mindestens einen Großbuchstaben enthalten",
        symbol: "Das Passwort muss mindestens eine Zahl oder Symbol enthalten"
      }
    },
    confPass: {
      label: "Passwort Bestätigung",
      errors: {
        default: "Die Passwörter stimmen nicht überein"
      }
    },
    submitButton: "Anmelden"
  },
  nederlands: {
    title: "Registreren",
    name: {
      label: "Naam",
      errors: {
        length: "De naam moet tenminst 3 karaters bevatten",
        symbols:
          "De naam mag allein lateinische karakters en de volgenden symbole bevatten (_, -, &)"
      }
    },
    company: {
      label: "Bedrijf",
      errors: {
        symbols:
          "De bedrijfsnaam mag allein lateinische karakters en de volgenden symbole bevatten (_, -, &)"
      }
    },
    email: {
      label: "Email",
      errors: { default: "Dat is geen geldige Emailadres" }
    },
    password: {
      label: "Wachtwoord",
      errors: {
        length: "De wachtwoord moet tenminst 8 karakters bevatten",
        uppercase: "De wachtwoord moet tenminst een hooftletter bevatten",
        symbol: "De wachtwoord moet tenminst een getal of symbol bevatten"
      }
    },
    confPass: {
      label: "Wachtwoord bevestiging",
      errors: {
        default: "De wachtwoorden komen niet overeen"
      }
    },
    submitButton: "Registreren"
  },
  espanol: {
    title: "Register",
    name: "Nombre",
    company: "Empresa",
    email: "Email",
    password: "contraseña",
    confPass: "confirmación de contraseña",
    submitButton: "Register"
  }
};
