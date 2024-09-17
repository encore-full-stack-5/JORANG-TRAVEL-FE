import axios from "axios";

export const getCountryInfo = async (id) => {
    const SERVICE_KEY = "n4CIAooC9K9WYWHWJZuRHh8%2F8xNisrFEgvEW7YjNdqjIjLGQZ4ULFRpIh9P01%2FfbqtFZSojDKVkyFaiIsrzKJA%3D%3D"

    const res = await axios.get(`https://apis.data.go.kr/1262000/CountryBasicService/getCountryBasicInfo?serviceKey=${SERVICE_KEY}&id=${id}`)

    console.log(res);
}
