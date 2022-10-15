// ===========================================
// **** for giving format to the price number
// ===========================================
export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    // we pass in the object
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
};

// =====================================================
// **** for making the filtering and get unique values
// =====================================================
// type -> string type
export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]); // get me all the possible categories
  //console.log(unique); // array of categories, array of copanies, array of array of colors -> ALL of them

  // ** for colors is different (it is already an array)
  if (type === 'colors') {
    unique = unique.flat(); // flat -> get array instead of array of arrays
  }

  // ** SET operator and pass the unique
  return ['all', ...new Set(unique)]; // unique categories + 'all'
};
