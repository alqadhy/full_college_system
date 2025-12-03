// IMPORTS
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function setThemeColors(primary_color, secondary_color) {
  document.documentElement.style.setProperty('--primary-color', primary_color);
  document.documentElement.style.setProperty('--secondary-color', secondary_color);
}

export function setWebsiteFavicon(favicon_url) {
  let link = document.querySelector("link[rel~='icon']");
  link.href = favicon_url;
}

export function changePageDirection(direction) {
  document.documentElement.dir = direction;
}

export function setPageTitle(title) {
  document.title = title;
}

export function isEmpty(value) {
  return value.length == 0;
}

export function showToastNotification(type, content, position, duration, hideProgressBar = false, pauseOnHover = true) {
  const settingsObj = {
    position: position,
    autoClose: duration,
    hideProgressBar: hideProgressBar,
    pauseOnHover: pauseOnHover,
  };

  switch (type) {
    case "error":
      toast.error(content, settingsObj);
      break;
    case "success":
      toast.success(content, settingsObj);
      break;
  }
}

export function showPopup(title, iconType, showCancelButton = true,
  confirmBtnTxt, cancelBtnTxt, onConfirmFn) {
  // SweetAlert2 SETUP
  const MySwal = withReactContent(Swal);

  MySwal.fire({
    title: title,
    icon: iconType,
    showCancelButton: showCancelButton,
    confirmButtonText: confirmBtnTxt,
    cancelButtonText: cancelBtnTxt,
  }).then(result => {
    if (result.isConfirmed)
      onConfirmFn();
  });
}