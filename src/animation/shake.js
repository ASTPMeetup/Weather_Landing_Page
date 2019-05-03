const attachShakeEventToLink = () => {
    const seeMoreLink = document.getElementById("see_more");
    const ActionPanel = document.getElementById("action_panel");

    seeMoreLink.addEventListener("click", () => {
        ActionPanel.classList.add("apply-shake");
    });
    
    ActionPanel.addEventListener("animationend", () => {
        ActionPanel.classList.remove("apply-shake");
    });
}

export default attachShakeEventToLink;