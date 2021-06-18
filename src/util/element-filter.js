module.exports = (eleText) => {
    switch (eleText) {
        case '01':
            return "Fire"
        case '02':
            return "Water"
        case '03':
            return "Earth"
        case '04':
            return "Wind"
        case '05':
            return "Light"
        case '06':
            return "Dark"
        case "This character's element is determined by the player.":
            return "Any/Null"
    }
}