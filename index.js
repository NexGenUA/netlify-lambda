const $btnCheckNumber = $('#check-number');
const $btnAddNumber = $('#add-number');
const $btnShowNumbers = $('#show-numbers');
const $snValue = $('#sn-number');
const $success = $('#success');
const $registered = $('#registered');
const $notFound = $('#not-found');
const $warning = $('#warning');
const $already = $('#already');
const $divNumbers = $('#numbers');
const $spinner = $('#spinner');

let clicked = false;
let serialNumber;

const hideElements = () => {
  $success.hide();
  $registered.hide();
  $notFound.hide();
  $warning.hide();
  $btnAddNumber.hide();
  $already.hide();
};

$btnCheckNumber.on('click', () => {
  if (!clicked) {
    hideElements();
    $spinner.show();
    clicked = true;
    const url = new URL('api/check-sn', location.origin);
    serialNumber = $snValue.val();

    url.searchParams.append('serial', serialNumber);
    fetch(url.href).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error('Not Found');
      }
    }).then(res => {
      if (res.added) {
        $already.show();
      } else {
        $success.show();
        $btnAddNumber.show();
      }
    }).catch(() => {
      $notFound.show();
    }).finally(() => {
      clicked = false;
      $spinner.hide();
    })
  }
});

$btnAddNumber.on('click', () => {
  if (!clicked) {
    clicked = true;
    $spinner.show();
    const url = new URL('api/register-sn', location.origin);
    url.searchParams.append('serial', serialNumber);
    fetch(url.href).then(res => {
      if (res.status === 200) {
        hideElements();
        $registered.show();
      }
    }).finally(() => {
      clicked = false;
      $spinner.hide();
    })
  }
});

$btnShowNumbers.on('click', () => {
  if (!clicked) {
    clicked = true;
    $spinner.show();
    const url = new URL('api/show-sns', location.origin);
    fetch(url.href).then(res => {
      if (res.status === 200) {
        return res.json();
      }
    }).then(res => {
      $divNumbers.empty();
      const $ul = $('<ul />').addClass('list-group w-25 mt-3');
      res.forEach(elem => {
        $ul.append($('<li/>').text(elem.serial).addClass('list-group-item'));
      });
      $divNumbers.append($ul);
    }).finally(() => {
      clicked = false;
      $spinner.hide();
    })
  }
});
