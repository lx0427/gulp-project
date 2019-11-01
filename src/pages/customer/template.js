$(() => {
  console.log(123);
  $('#target').append(template('varTemplate'), {
    data: [1, 2, 3, 4]
  })
})