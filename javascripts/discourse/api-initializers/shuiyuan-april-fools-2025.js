import { apiInitializer } from "discourse/lib/api";
import apiInitializer2024 from "../lib/2024/shuiyuan-april-fools-2024";
import apiInitializer2022 from "../lib/2022/shuiyuan-april-fools-2022";

export default apiInitializer((/* api */) => {
  // Your code here (uncomment api above to use it)
  if (window.localStorage.getItem("shuiyuan-april-fools-rewind") === "2024") { 
    apiInitializer2024.initialize();
  }else if (window.localStorage.getItem("shuiyuan-april-fools-rewind") === "2022") {
    apiInitializer2022.initialize();
  }
});
