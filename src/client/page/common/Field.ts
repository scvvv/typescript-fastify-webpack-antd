import {FieldState} from "formstate";
import {action, computed, observable} from "mobx";

export interface FieldBean {
    hasFeedback?: boolean;
    required?: boolean;
    disabled?: boolean;
    value: any;
    option?: any[];
}

export class Field<T extends FieldBean> extends FieldState<T> {
    constructor(props: FieldBean) {
        super(props.value);

        const {hasFeedback = true, required = false, disabled = false, option = []} = props;

        this.disabled = disabled;
        this.required = required;
        this.hasFeedback = hasFeedback;
        this.option = option;
    }

    @observable
    public hasFeedback: boolean;

    @observable
    public required: boolean;

    @observable
    public disabled: boolean;

    @observable
    public option: any[];

    @computed
    public get validateStatus() {
        if (!this.hasBeenValidated) {
            return '';
        } else {
            return this.error ? 'error' : 'success';
        }
    }

    @action
    public changeField = (fieldName: keyof FieldBean, value) => {
        this[fieldName] = value;
    }
}
