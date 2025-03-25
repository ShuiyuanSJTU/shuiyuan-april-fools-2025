import { apiInitializer } from "discourse/lib/api";
import { BugController, SpiderController } from "./bugs";

export default apiInitializer("0.11.1", api => {
  if (!settings.enable_easter_egg_2022) { return; }
  var $maxFlies = settings.max_number_fruit_flies_2022;
  var $maxSpiders = settings.max_number_spiders_2022;
  var $minDelay = settings.delay_start_2022;
  var $maxDelay = settings.delay_start_2022;
  var $mouseOver = settings.mouseover_action_2022;
  var $canInteract = settings.bugs_can_interact_2022;

  var $flySprite = settings.theme_uploads.fly;
  var $spiderSprite = settings.theme_uploads.spider;

  if (settings.show_bugs_2022) {
    new BugController({
      'minBugs': 1, 'maxBugs': $maxFlies, 'mouseOver': $mouseOver, 'minDelay': $minDelay,
      'maxDelay': $maxDelay, 'imageSprite': $flySprite, canInteract: $canInteract
    });
    new SpiderController({
      'minBugs': 1, 'maxBugs': $maxSpiders, 'mouseOver': $mouseOver, 'minDelay': $minDelay,
      'maxDelay': $maxDelay, 'imageSprite': $spiderSprite, zoom: 4, canInteract: $canInteract
    });
  }
});
