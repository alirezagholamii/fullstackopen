import { useEffect, useState } from 'react'
import axios from 'axios'

/*
API RESPONSE EXAMPLE
[
  {
    "name": {
      "common": "Iran",
      "official": "Islamic Republic of Iran",
      "nativeName": {
        "fas": {
          "official": "جمهوری اسلامی ایران",
          "common": "ایران"
        }
      }
    },
    "tld": [
      ".ir",
      "ایران."
    ],
    "cca2": "IR",
    "ccn3": "364",
    "cca3": "IRN",
    "cioc": "IRI",
    "independent": true,
    "status": "officially-assigned",
    "unMember": true,
    "currencies": {
      "IRR": {
        "name": "Iranian rial",
        "symbol": "﷼"
      }
    },
    "idd": {
      "root": "+9",
      "suffixes": [
        "8"
      ]
    },
    "capital": [
      "Tehran"
    ],
    "altSpellings": [
      "IR",
      "Islamic Republic of Iran",
      "Iran, Islamic Republic of",
      "Jomhuri-ye Eslāmi-ye Irān"
    ],
    "region": "Asia",
    "subregion": "Southern Asia",
    "languages": {
      "fas": "Persian (Farsi)"
    },
    "translations": {
      "ara": {
        "official": "جمهورية إيران الإسلامية",
        "common": "إيران"
      },
      "ces": {
        "official": "Islámská republika Írán",
        "common": "Írán"
      },
      "cym": {
        "official": "Islamic Republic of Iran",
        "common": "Iran"
      },
      "deu": {
        "official": "Islamische Republik Iran",
        "common": "Iran"
      },
      "est": {
        "official": "Iraani Islamivabariik",
        "common": "Iraan"
      },
      "fin": {
        "official": "Iranin islamilainen tasavalta",
        "common": "Iran"
      },
      "fra": {
        "official": "République islamique d'Iran",
        "common": "Iran"
      },
      "hrv": {
        "official": "Islamska Republika Iran",
        "common": "Iran"
      },
      "hun": {
        "official": "Iráni Iszlám Köztársaság",
        "common": "Irán"
      },
      "ita": {
        "official": "Repubblica islamica dell'Iran",
        "common": "Iran"
      },
      "jpn": {
        "official": "イラン·イスラム共和国",
        "common": "イラン・イスラム共和国"
      },
      "kor": {
        "official": "이란 이슬람 공화국",
        "common": "이란"
      },
      "nld": {
        "official": "Islamitische Republiek Iran",
        "common": "Iran"
      },
      "pol": {
        "official": "Islamska Republika Iranu",
        "common": "Iran"
      },
      "por": {
        "official": "República Islâmica do Irã",
        "common": "Irão"
      },
      "rus": {
        "official": "Исламская Республика Иран",
        "common": "Иран"
      },
      "slk": {
        "official": "Iránska islamská republika",
        "common": "Irán"
      },
      "spa": {
        "official": "República Islámica de Irán",
        "common": "Iran"
      },
      "swe": {
        "official": "Islamiska republiken Iran",
        "common": "Iran"
      },
      "urd": {
        "official": "جمہوریہ ایران",
        "common": "ایران"
      },
      "zho": {
        "official": "伊朗伊斯兰共和国",
        "common": "伊朗"
      }
    },
    "latlng": [
      32,
      53
    ],
    "landlocked": false,
    "borders": [
      "AFG",
      "ARM",
      "AZE",
      "IRQ",
      "PAK",
      "TUR",
      "TKM"
    ],
    "area": 1648195,
    "demonyms": {
      "eng": {
        "f": "Iranian",
        "m": "Iranian"
      },
      "fra": {
        "f": "Iranienne",
        "m": "Iranien"
      }
    },
    "flag": "🇮🇷",
    "maps": {
      "googleMaps": "https://goo.gl/maps/dMgEGuacBPGYQnjY7",
      "openStreetMaps": "https://www.openstreetmap.org/relation/304938"
    },
    "population": 83992953,
    "gini": {
      "2018": 42
    },
    "fifa": "IRN",
    "car": {
      "signs": [
        "IR"
      ],
      "side": "right"
    },
    "timezones": [
      "UTC+03:30"
    ],
    "continents": [
      "Asia"
    ],
    "flags": {
      "png": "https://flagcdn.com/w320/ir.png",
      "svg": "https://flagcdn.com/ir.svg"
    },
    "coatOfArms": {
      "png": "https://mainfacts.com/media/images/coats_of_arms/ir.png",
      "svg": "https://mainfacts.com/media/images/coats_of_arms/ir.svg"
    },
    "startOfWeek": "turday",
    "capitalInfo": {
      "latlng": [
        35.7,
        51.42
      ]
    },
    "postalCode": {
      "format": "##########",
      "regex": "^(\\d{10})$"
    }
  },
  {
    "name": {
      "common": "Cook Islands",
      "official": "Cook Islands",
      "nativeName": {
        "eng": {
          "official": "Cook Islands",
          "common": "Cook Islands"
        },
        "rar": {
          "official": "Kūki 'Āirani",
          "common": "Kūki 'Āirani"
        }
      }
    },
    "tld": [
      ".ck"
    ],
    "cca2": "CK",
    "ccn3": "184",
    "cca3": "COK",
    "cioc": "COK",
    "independent": false,
    "status": "officially-assigned",
    "unMember": false,
    "currencies": {
      "CKD": {
        "name": "Cook Islands dollar",
        "symbol": "$"
      },
      "NZD": {
        "name": "New Zealand dollar",
        "symbol": "$"
      }
    },
    "idd": {
      "root": "+6",
      "suffixes": [
        "82"
      ]
    },
    "capital": [
      "Avarua"
    ],
    "altSpellings": [
      "CK",
      "Kūki 'Āirani"
    ],
    "region": "Oceania",
    "subregion": "Polynesia",
    "languages": {
      "eng": "English",
      "rar": "Cook Islands Māori"
    },
    "translations": {
      "ara": {
        "official": "جزر كوك",
        "common": "جزر كوك"
      },
      "ces": {
        "official": "Cookovy ostrovy",
        "common": "Cookovy ostrovy"
      },
      "cym": {
        "official": "Ynysoedd Cook",
        "common": "Ynysoedd Cook"
      },
      "deu": {
        "official": "Cookinseln",
        "common": "Cookinseln"
      },
      "est": {
        "official": "Cooki saared",
        "common": "Cooki saared"
      },
      "fin": {
        "official": "Cookinsaaret",
        "common": "Cookinsaaret"
      },
      "fra": {
        "official": "Îles Cook",
        "common": "Îles Cook"
      },
      "hrv": {
        "official": "Cook Islands",
        "common": "Cookovo Otočje"
      },
      "hun": {
        "official": "Cook-szigetek",
        "common": "Cook-szigetek"
      },
      "ita": {
        "official": "Isole Cook",
        "common": "Isole Cook"
      },
      "jpn": {
        "official": "クック諸島",
        "common": "クック諸島"
      },
      "kor": {
        "official": "쿡 제도",
        "common": "쿡 제도"
      },
      "nld": {
        "official": "Cook eilanden",
        "common": "Cookeilanden"
      },
      "per": {
        "official": "جزایر کوک",
        "common": "جزایر کوک"
      },
      "pol": {
        "official": "Wyspy Cooka",
        "common": "Wyspy Cooka"
      },
      "por": {
        "official": "Ilhas Cook",
        "common": "Ilhas Cook"
      },
      "rus": {
        "official": "острова Кука",
        "common": "Острова Кука"
      },
      "slk": {
        "official": "Cookove ostrovy",
        "common": "Cookove ostrovy"
      },
      "spa": {
        "official": "Islas Cook",
        "common": "Islas Cook"
      },
      "swe": {
        "official": "Cooköarna",
        "common": "Cooköarna"
      },
      "urd": {
        "official": "جزائر کک",
        "common": "جزائر کک"
      },
      "zho": {
        "official": "库克群岛",
        "common": "库克群岛"
      }
    },
    "latlng": [
      -21.23333333,
      -159.76666666
    ],
    "landlocked": false,
    "area": 236,
    "demonyms": {
      "eng": {
        "f": "Cook Islander",
        "m": "Cook Islander"
      },
      "fra": {
        "f": "Cookienne",
        "m": "Cookien"
      }
    },
    "flag": "🇨🇰",
    "maps": {
      "googleMaps": "https://goo.gl/maps/nrGZrvWRGB4WHgDC9",
      "openStreetMaps": "https://www.openstreetmap.org/relation/2184233"
    },
    "population": 18100,
    "fifa": "COK",
    "car": {
      "signs": [
        "NZ"
      ],
      "side": "left"
    },
    "timezones": [
      "UTC-10:00"
    ],
    "continents": [
      "Oceania"
    ],
    "flags": {
      "png": "https://flagcdn.com/w320/ck.png",
      "svg": "https://flagcdn.com/ck.svg"
    },
    "coatOfArms": {
      "png": "https://mainfacts.com/media/images/coats_of_arms/ck.png",
      "svg": "https://mainfacts.com/media/images/coats_of_arms/ck.svg"
    },
    "startOfWeek": "monday",
    "capitalInfo": {
      "latlng": [
        -21.2,
        -159.77
      ]
    }
  }
]*/


export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    if (!name) {
      return
    }
    const fetchData = async () => {
      try {
        const result = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
        setCountry({ ...result.data[0], found: true })
      } catch (e) {
        setCountry({})
      }
    }
    fetchData()
  }, [name])

  return country

}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}