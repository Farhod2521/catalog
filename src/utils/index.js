import {find, get,  isArray, isNil, forEach, keys, includes} from "lodash";
import i18config from "../services/i18n"
import {CATEGORY_LIST} from "@/constants/enums";

export const getDefaultValue = (options, id) => {
    return find(options, (option) => get(option, 'value') === id)
}

export const getOptionList = (options, key = 'id', value = 'name', isFilter = false) => {
    if (isArray(options)) {
        if (isFilter) {
            return options.filter(_option => !isNil(get(_option, 'filterUrl'))).map(option => ({
                value: get(option, key),
                label: i18config.t(get(option, value))
            }))
        }
        return options.map(option => ({value: get(option, key), label: i18config.t(get(option, value))}))
    }
    return []
}

export const findCurrency = (currencyList = [], currency) => {
    return find(currencyList, (_currency) => get(_currency, 'Ccy') === _currency) || {}
}

export const findCategoryName = (item) => {
    let category = '';
  forEach(keys(CATEGORY_LIST),(_key)=>{
      if(includes(keys(item),`${_key}_code`)){
          category =  CATEGORY_LIST[_key];
      }
  })
    return category;
}

export const getPriceByCurrency = (currencyList, currency) => {
    return get(findCurrency(findCurrency, currency), 'Rate') || 0;
}