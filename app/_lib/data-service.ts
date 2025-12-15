const getCountries = async() =>{
  try {
    const res = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag'
    );
    const countries = await res.json();
    return countries as { name: string; flag: string }[];
  } catch {
    throw new Error('Could not fetch countries');
  }
}

export { getCountries };