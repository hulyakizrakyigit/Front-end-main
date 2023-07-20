// Adımlar:

// 1. Gerekli DOM elemanlarını seçin
const listDOM = document.querySelector("#list");
const successToast = document.getElementById("successToast");
const errorToast = document.getElementById("errorToast");

// 2. Listeye tıklama olayını dinleyin
listDOM.addEventListener("click", (e) => {
  // Tıklanan öge bir liste ögesi mi kontrol edin
  if (e.target.tagName === "LI") {
    // "checked" sınıfını ekleyin/kaldırın ve durumu kaydedin
    e.target.classList.toggle("checked");
    saveListToLocalStorage();
  } else if (e.target.classList.contains("close")) {
    // Kapatma ikonuna tıklanmışsa ögeyi silin ve durumu kaydedin
    e.target.parentNode.remove();
    saveListToLocalStorage();
  }
});

// 3. Ögeye kapatma ikonu ekleyin
function addCloseIcon(element) {
  var closeIcon = document.createElement("span");
  closeIcon.innerHTML = "&times;";
  closeIcon.className = "close";
  closeIcon.setAttribute("aria-label", "Kapat");

  closeIcon.onclick = function () {
    element.remove();
    saveListToLocalStorage();
  };

  element.appendChild(closeIcon);
}

// 4. Varolan liste ögelerine kapatma ikonu ekleyin
const NodeList = document.getElementsByTagName("li");
Array.from(NodeList).forEach((element) => addCloseIcon(element));

// 5. Toast mesajını gösterme işlevi
function toastShow(className) {
  const toastElement = document.querySelector(className);
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

// 6. Yeni öge ekleme işlevi
function newElement() {
  const inputTask = document.querySelector("#task");
  const txt = inputTask.value.trim();
  if (txt) {
    // Giriş alanı doluysa ögeyi ekle ve toast mesajını göster
    addItem(txt);
    inputTask.value = "";
    toastShow(".success");
  } else {
    // Giriş alanı boşsa hata toast mesajını göster
    toastShow(".error");
    inputTask.value = "";
  }
}

// 7. Yeni ögeyi listeye ekleyen işlev
const addItem = (inputTask) => {
  let liDOM = document.createElement("li");
  liDOM.innerHTML = inputTask;
  listDOM.append(liDOM);
  addCloseIcon(liDOM);
  saveListToLocalStorage();
};

// 8. Listeyi ve "checked" durumunu yerel depolamaya kaydeden işlev
function saveListToLocalStorage() {
  const allListItems = Array.from(listDOM.getElementsByTagName("li"));
  const taskList = allListItems.map((item) => {
    return {
      content: item.innerHTML,
      checked: item.classList.contains("checked"),
    };
  });
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

// 9. Sayfa yüklendiğinde liste ögelerini yerel depolamadan yükleme işlevi
document.addEventListener("DOMContentLoaded", () => {
  const storedTaskList = localStorage.getItem("taskList");
  if (storedTaskList) {
    const taskList = JSON.parse(storedTaskList);
    taskList.forEach((task) => {
      addItem(task.content);
      const lastLi = listDOM.lastElementChild;
      if (task.checked) {
        lastLi.classList.add("checked");
      }
    });
  }
});
