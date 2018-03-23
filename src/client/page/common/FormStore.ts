import * as _ from "lodash";
import {FormState, ValidatableMapOrArray} from "formstate";
import {action} from "mobx";
import {toJSDeep} from "util/toJSDeep";
import {Field} from "./Field";

export class FormStore<TValue extends ValidatableMapOrArray> extends FormState<TValue> {
    public clear = async ($) => {
        _.forIn($, (item: any, key) => {
            if (item instanceof FormStore) {
                if (_.isArray(toJSDeep(item.$))) {
                    _.forEach(item.$, (_item, _key) => {
                        _.forIn(_item.$, (__item, __key) => {
                            if (__item instanceof FormStore) {
                                this.clear(__item);
                            } else {
                                __item.reinitValue();
                            }
                        });
                    })

                } else {
                    _.forIn(item.$, (_item: Field<any>, _key) => {
                        _item.reinitValue();
                    })
                }
            } else {
                item.reinitValue();
            }
        })

        // await this.validate();
    };

    public clearFormAndValid = () => {
        const $ = this.$;

        this.clear($);
    }

    public getNestValues = () => {
        const obj = {};

        _.forIn(this.$, (item: FormStore<any> | Field<any>, key) => {
            if (item instanceof FormStore) {
                if (_.isArray(toJSDeep(item.$))) {
                    obj[key] = _.map<FormStore<any> | Field<any>>(item.$, (_item) => {
                        return _.mapValues(_item.$, (__item) => {
                            return toJSDeep(__item.value);
                        });
                    });
                } else {
                    _.forIn(item.$, (_item, _key) => {
                        obj[key][_key] = toJSDeep(_item.value);
                    })
                }
            } else {
                obj[key] = toJSDeep(item.value);
            }
        });

        return obj;
    }

    public setValues = (values) => {
        if (values) {
            _.forEach(this.$, action((item, key) => {
                if (!(item instanceof FormStore)) {
                    // console.log(item)
                    // console.log(values[key])
                    item.onChange(values[key]);
                }
            }))
        }
    }
}
