export const formatDate = (date: Date) => {
  var ano = date.getFullYear();
  var mes = ("0" + (date.getMonth() + 1)).slice(-2);
  var dia = ("0" + date.getDate()).slice(-2);

  return ano + "-" + mes + "-" + dia;
};
