import { apiInitializer } from "discourse/lib/api";
import KeyboardShortcuts from "discourse/lib/keyboard-shortcuts";
import discourseLater from "discourse-common/lib/later";
import { printHint1, printHint2 } from "./console";
import Icons from "./icons";
import { getTextNodes, randomSwap } from "./utils";

export default apiInitializer("0.11.1", api => {
  if (!settings.enable_easter_egg_2024) { return; }
  
  // add switch function to window
  window.IWantMore = () => { 
    window.localStorage.setItem("shuiyuan-april-fools-2024", "true");
    window.location.reload();
  }
  window.IWantLess = () => {
    window.localStorage.removeItem("shuiyuan-april-fools-2024");
    window.location.reload();
  }

  const currentUser = api.getCurrentUser();
  const inGroup = !!window.localStorage.getItem("shuiyuan-april-fools-2024");
  const today = new Date();
  const isAprilFoolsDay = today.getMonth() === 3 && today.getDate() === 1;
  const isMobleDevice = api._lookupContainer("service:site").isMobileDevice;
  if (!inGroup) {
    if (isAprilFoolsDay || settings.force_global_easter_egg_2024) {
      // not in group, but it's April Fools' Day or forced
      // enable global easter egg
      document.body.classList.add("shuiyuan-april-fools-2024-global");
      KeyboardShortcuts.unbind({
        "ctrl+shift+i": null,
        "F12": null,
      });
      if(!isMobleDevice){ discourseLater(printHint1, 5000); }
    }
    // do nothing if not in group
    return;
  }

  document.body.classList.add("shuiyuan-april-fools-2024");

  api.reopenWidget("post-avatar", {
    html(attrs) {
      // eslint-disable-next-line no-bitwise
      if((attrs.id^currentUser.id)*7%100/100 < settings.avatar_replace_probability_2024) {
        attrs.avatar_template = currentUser.avatar_template;
      }
      return this._super(attrs);
    }
  });

  api.decorateCookedElement((elem) => {
    if (Math.random() > settings.post_content_shuffle_probability_2024) {
      return;
    }
    const textNodes = getTextNodes(elem);
    textNodes.forEach(node => {
      node.textContent = randomSwap(
        node.textContent,
        settings.post_content_shuffle_pairwise_probability_2024);
    });
  },
    { id: "shuiyuan-april-fools-2024", onlyStream: true }
  );

  api.onPageChange(() => {
    if (Math.random() < settings.icon_shuffle_probability_2024) {
      Icons.shuffleIcons();
    } else {
      Icons.restoreIcons();
    }
  });

  if(!isMobleDevice){ discourseLater(printHint2, 3000); }
});
