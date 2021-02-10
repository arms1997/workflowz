const showError = function(message, type) {
  $(`.${type}_error`).append(`<p>${message}</p>`);
  $(`.${type}_error`).slideDown("slow", function () { });
}

const clearError = function(type) {
  $(`.${type}_error`).empty();
  $(`.${type}_error`).css('display', 'none');
}

const clearInput = function (type) {
  $(`.modal-${type}-content`).find('input').each(function () {
    $(this).val('');
  })
}

const clearTextArea = function (type) {
  $(`.modal-${type}-content`).find('textarea').each(function () {
    $(this).val('');
  })
}

const ratings = function (id) {
  for (let check = 1; check <= id; check++) {
    $(`#${check}`).attr('class', 'fa fa-star checked');
  }
  for (let uncheck = 5; uncheck > id; uncheck--) {
    $(`#${uncheck}`).attr('class', 'fa fa-star');
  }
}

const loadCurrentRating = function(data) {
  ratings(data.resource.rating);
}

const showUsername = function(name) {
  $('#new-name').remove();
  $('.user-name').prepend(name);
  $('.setting-button-container').show();
}

const resourceToLogin = function() {
  $('.modal-bg1').removeClass('bg-active');
  $('.img-container').removeClass('change-order')
  $('.modal-bg3').addClass('bg-active');
  $('.img-container').addClass('change-order')
}

const logInCheck = async function() {
  let isLoggedIn;
  try {
    isLoggedIn = await getMyDetails();
  } catch(err) {
    console.log(err, "error")
  }
  return isLoggedIn;
}

const emptyUserInfo = () => {
  $('.user')
    .hide()
    .children("button").empty();
  $('#user-initial').empty();
  $('#user-name').empty();
  $('#user-email').empty();
  $('.logged-in').hide();
  $('#my-page').removeData();
  $('#personal-box').empty();
}
