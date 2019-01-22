export const register = {
  en: {
    title: "Register",
    name: {
      label: "Name",
      errors: {
        length: "the name needs to be at least 3 characters long",
        symbols:
          "the name can only contain latin-letters and the following symbols (_, -, ., &)"
      }
    },
    company: {
      label: "Company",
      errors: {
        symbols:
          "the company name can only contain latin-letters and the following symbols (_, -, ., &)"
      }
    },
    email: {
      label: "Email",
      errors: { valid: "That is not a valid Email adress" }
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
        match: "The password confirmation does not match the password"
      }
    },
    submitButton: "Register"
  },
  de: {
    title: "Anmelden",
    name: {
      label: "Name",
      errors: {
        length: "Der Name muss mindestens 3 Zeichen enthalten",
        symbols:
          "Der Name darf nur lateinische Buchstaben und die folgenden Symbole enthalten (_, -, ., &)"
      }
    },
    company: {
      label: "Firma",
      errors: {
        symbols:
          "Der Firmen-Name darf nur lateinische Buchstaben und die folgenden Symbole enthalten (_, -, ., &)"
      }
    },
    email: {
      label: "Email",
      errors: { valid: "Das ist keine gültige Email adresse" }
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
        match: "Die Passwörter stimmen nicht überein"
      }
    },
    submitButton: "Anmelden"
  },
  nl: {
    title: "Registreren",
    name: {
      label: "Naam",
      errors: {
        length: "De naam moet tenminst 3 karaters bevatten",
        symbols:
          "De naam mag allein lateinische karakters en de volgenden symbole bevatten (_, -, ., &)"
      }
    },
    company: {
      label: "Bedrijf",
      errors: {
        symbols:
          "De bedrijfsnaam mag allein lateinische karakters en de volgenden symbole bevatten (_, -, ., &)"
      }
    },
    email: {
      label: "Email",
      errors: { valid: "Dat is geen geldige Emailadres" }
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
        match: "De wachtwoorden komen niet overeen"
      }
    },
    submitButton: "Registreren"
  },
  es: {
    title: "Register",
    name: {
      label: "Nombre",
      errors: {
        length: "El nombre requiere mínimo 3 caracteres",
        symbols:
          "El nombre de la compañia debe de consistir solamente de caracteres latinos o los símbolos (_, -, ., &)"
      }
    },
    company: {
      label: "Compañia",
      errors: {
        symbols:
          "El nombre de la compañia debe de consistir solamente de caracteres latinos o los símbolos (_, -, ., &)"
      }
    },
    email: {
      label: "Email",
      errors: { valid: "El correo electrónico no es valido" }
    },
    password: {
      label: "contraseña",
      errors: {
        length: "La contraseña necesita mínimo 8 letras",
        symbol: "La contraseña necesita por lo menos un numero o símbol",
        uppercase: "La contraseña necesita por lo menos una letra mayúscula"
      }
    },
    confPass: {
      label: "confirmación de contraseña",
      errors: { match: "La verificación de la contraseña no cuadra" }
    },
    submitButton: "Register"
  }
};
