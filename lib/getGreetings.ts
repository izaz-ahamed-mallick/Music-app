const getGreetings = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return "🌞 Good morning! Ready for some music?";
    } else if (hour >= 12 && hour < 18) {
        return "🌤️ Good afternoon! Let's vibe!";
    } else if (hour >= 18 && hour < 22) {
        return "🌆 Good evening! Time to unwind!";
    } else {
        return "🌙 Good night! Chill with some tunes!";
    }
};

export default getGreetings;
