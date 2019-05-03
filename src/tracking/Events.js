import ReactGA from "react-ga";

export const GAEvent = (category, action, label) => {
    ReactGA.event({
        category: category,
        action: action,
        label: label
    });
};