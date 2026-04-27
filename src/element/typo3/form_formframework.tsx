'use client';
import { useEffect, useState } from 'react';
import {
    useFormik,
} from 'formik';
import { formErrors, getFormDefination } from "@/lib/hooks/t3element";
import React from "react";
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { submitForm, fileUpload } from '@/lib/service';
import { useConfig } from '../common/ConfigProvider';
import { isGeneratorFunction } from 'util/types';

export default function Tforms({ data }: any) {
    const config = useConfig();
    data = getFormDefination(data, config);
    let _fdata: any = data?.form;
    let _stpes: any = _fdata?.renderables;
    let [visiblestep, SetVisible] = useState(0);
    let [schema, SetSchema]: any = useState(null);
    let [confirmmessage, SetConfirmmessage]: any = useState(null);
    const { push } = useRouter();

    useEffect(() => {
        if (!schema) {
            prepareValidationSchema();
        }
    }, [schema]);

    const nextStep = async () => {
        let _next = 0;
        if (_stpes[visiblestep]) {
            if (_stpes[visiblestep]?.type == 'Page') {
                if (_stpes[visiblestep]?.renderables?.length > 0) {
                    _stpes[visiblestep]?.renderables?.map((_fld: any, index: any) => {
                        if (formik?.errors[_fld?.identifier]) {
                            _next = 1;
                        }
                        if (index == (_stpes[visiblestep]?.renderables?.length - 1)) {
                            if (!_next) {
                                if (_stpes?.length >= (visiblestep + 1)) {
                                    SetVisible(visiblestep + 1);
                                }
                            }
                        }
                    });
                } else {
                    if (_stpes?.length >= (visiblestep + 1)) {
                        SetVisible(visiblestep + 1);
                    }
                }
            } else {
                if (_stpes?.length >= (visiblestep + 1)) {
                    SetVisible(visiblestep + 1);
                }
            }
        } else {
            if (_stpes?.length >= (visiblestep + 1)) {
                SetVisible(visiblestep + 1);
            }
        }
    }
    const prvStep = () => {
        if (visiblestep != 0) {
            SetVisible(visiblestep - 1);
        }
    }

    const prepareValidationSchema = async () => {
        let _validation: any = new Object();
        await _stpes?.map(async (_ctep: any, index: any) => {
            if (_ctep?.type == "Page") {
                await _ctep?.renderables?.map(async (_fld: any) => {
                    await _fld?.renderables?.map(async (__fld: any) => {
                        if (__fld?.type == 'Text' || __fld?.type == 'Password' || __fld?.type == 'Url' || __fld?.type == 'Textarea' || __fld?.type == 'SingleSelect' || __fld?.type == 'CountrySelect' || __fld?.type == 'RadioButton' || __fld?.type == 'Telephone') {
                            if (__fld?.validators?.length > 0) {
                                await __fld?.validators?.map(async (_val: any) => {
                                    if (_val?.identifier == "NotEmpty") {
                                        var _errors = await formErrors.filter(function (el: any) { return el.identifier == "NotEmpty"; });
                                        var _msg: any = '';
                                        var _ms = await _errors.filter(function (el: any) { return el.code == 1221560718 });
                                        _msg = _ms[0]?.msg;
                                        if (__fld?.properties?.validationErrorMessages?.length) {
                                            var _cer = await __fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == 1221560718 });
                                            if (_cer?.length > 0) {
                                                _msg = _cer[0]?.message;
                                            }
                                        }
                                        _validation[__fld?.identifier] = Yup.string().required(_msg);
                                    }
                                });
                            }
                        }
                        if (__fld?.type == 'Email') {
                            if (__fld?.validators?.length > 0) {
                                var _rmsg: any = '';
                                var _msg: any = '';
                                await __fld?.validators?.map(async (_val: any) => {
                                    var _errors = await formErrors.filter(function (el: any) { return el.identifier == "EmailAddress"; });
                                    if (_val?.identifier == "EmailAddress") {
                                        var _ms = await _errors.filter(function (el: any) { return el.identifier == "EmailAddress" });
                                        _msg = _ms[0]?.msg;
                                        if (__fld?.properties?.validationErrorMessages?.length) {
                                            var _cer = await __fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == _ms[0]?.code });
                                            if (_cer?.length > 0) {
                                                _msg = _cer[0]?.message;
                                            }
                                        }
                                    }
                                    if (_val?.identifier == "NotEmpty") {
                                        var _errors = await formErrors.filter(function (el: any) { return el.identifier == "NotEmpty"; });
                                        var _ms = await _errors.filter(function (el: any) { return el.code == 1221560718 });
                                        _rmsg = _ms[0]?.msg;
                                        if (__fld?.properties?.validationErrorMessages?.length) {
                                            var _cer = await __fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == 1221560718 });
                                            if (_cer?.length > 0) {
                                                _rmsg = _cer[0]?.message;
                                            }
                                        }
                                        _validation[__fld?.identifier] = Yup.string().email(_msg).required(_rmsg);
                                    } else {
                                        _validation[__fld?.identifier] = Yup.string().email(_msg);
                                    }
                                });
                            }
                        }
                        if (__fld?.type == 'Number') {
                            if (__fld?.validators?.length > 0) {
                                var _rmsg: any = '';
                                var _msg: any = '';
                                await __fld?.validators?.map(async (_val: any) => {
                                    if (_val?.identifier == "Number") {
                                        var _errors = await formErrors.filter(function (el: any) { return el.identifier == "Number"; });
                                        var _ms = await _errors.filter(function (el: any) { return el.identifier == "Number" });
                                        _msg = _ms[0]?.msg;
                                        if (__fld?.properties?.validationErrorMessages?.length) {
                                            var _cer = await __fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == _ms[0]?.code });
                                            if (_cer?.length > 0) {
                                                _msg = _cer[0]?.message;
                                            }
                                        }
                                    }
                                    if (_val?.identifier == "NotEmpty") {
                                        var _errors = await formErrors.filter(function (el: any) { return el.identifier == "NotEmpty"; });
                                        var _ms = await _errors.filter(function (el: any) { return el.code == 1221560718 });
                                        _rmsg = _ms[0]?.msg;
                                        if (__fld?.properties?.validationErrorMessages?.length) {
                                            var _cer = await __fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == 1221560718 });
                                            if (_cer?.length > 0) {
                                                _rmsg = _cer[0]?.message;
                                            }
                                        }
                                        _validation[__fld?.identifier] = Yup.number().typeError(_msg).required(_rmsg);
                                    } else {
                                        _validation[__fld?.identifier] = Yup.number().typeError(_msg);
                                    }
                                });
                            }
                        }
                        if (__fld?.type == 'Date') {
                            if (__fld?.validators?.length > 0) {
                                var _rmsg: any = '';
                                var _msg: any = '';
                                await __fld?.validators?.map(async (_val: any) => {
                                    if (_val?.identifier == "NotEmpty") {
                                        var _errors = await formErrors.filter(function (el: any) { return el.identifier == "NotEmpty"; });
                                        var _ms = await _errors.filter(function (el: any) { return el.code == 1221560718 });
                                        _rmsg = _ms[0]?.msg;
                                        if (__fld?.properties?.validationErrorMessages?.length) {
                                            var _cer = await __fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == 1221560718 });
                                            if (_cer?.length > 0) {
                                                _rmsg = _cer[0]?.message;
                                            }
                                        }
                                        _validation[__fld?.identifier] = Yup.date().required(_rmsg);
                                    } else {
                                        _validation[__fld?.identifier] = Yup.date();
                                    }
                                });
                            }
                        }
                        if (__fld?.type == 'Url') {
                            if (__fld?.validators?.length > 0) {
                                var _rmsg: any = '';
                                var _msg: any = '';
                                var _re = await formErrors.filter(function (el: any) { return el.code == 1221565130 });
                                await __fld?.validators?.map(async (_val: any) => {
                                    if (_val?.identifier == "NotEmpty") {
                                        var _errors = await formErrors.filter(function (el: any) { return el.identifier == "NotEmpty"; });
                                        var _ms = await _errors.filter(function (el: any) { return el.code == 1221560718 });
                                        _rmsg = _ms[0]?.msg;
                                        if (__fld?.properties?.validationErrorMessages?.length) {
                                            var _cer = await __fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == 1221560718 });
                                            if (_cer?.length > 0) {
                                                _rmsg = _cer[0]?.message;
                                            }
                                        }
                                        _validation[__fld?.identifier] = Yup.string().matches(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/, _re[0]?.msg).required(_rmsg);
                                    } else {
                                        _validation[__fld?.identifier] = Yup.string().matches(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/, _re[0]?.msg);
                                    }
                                });
                            } else {
                                _validation[__fld?.identifier] = Yup.string().matches(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/, _msg);
                            }
                        }
                        if (__fld?.type == 'Telephone') {
                            if (__fld?.validators?.length > 0) {
                                var _rmsg: any = '';
                                var _msg: any = '';
                                var _re = await formErrors.filter(function (el: any) { return el.code == 1221565130 });
                                await __fld?.validators?.map(async (_val: any) => {
                                    if (_val?.identifier == "NotEmpty") {
                                        var _errors = await formErrors.filter(function (el: any) { return el.identifier == "NotEmpty"; });
                                        var _ms = await _errors.filter(function (el: any) { return el.code == 1221560718 });
                                        _rmsg = _ms[0]?.msg;
                                        if (__fld?.properties?.validationErrorMessages?.length) {
                                            var _cer = await __fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == 1221560718 });
                                            if (_cer?.length > 0) {
                                                _rmsg = _cer[0]?.message;
                                            }
                                        }
                                        _validation[__fld?.identifier] = Yup.string().matches(/^[0-9-+\s()]*$/, _re[0]?.msg).required(_rmsg);
                                    } else {
                                        _validation[__fld?.identifier] = Yup.string().matches(/^[0-9-+\s()]*$/, _re[0]?.msg);
                                    }
                                });
                            } else {
                                _validation[__fld?.identifier] = Yup.string().matches(/^[0-9-+\s()]*$/, _msg);
                            }
                        }
                        if (__fld?.type == "Checkbox" || __fld?.type == "MultiCheckbox" || __fld?.type == "MultiSelect") {
                            if (__fld?.validators?.length > 0) {
                                await __fld?.validators?.map(async (_val: any) => {
                                    if (_val?.identifier == "NotEmpty") {
                                        var _errors = await formErrors.filter(function (el: any) { return el.identifier == "NotEmpty"; });
                                        var _msg: any = '';
                                        var _ms = await _errors.filter(function (el: any) { return el.code == 1221560718 });
                                        _msg = _ms[0]?.msg;
                                        if (__fld?.properties?.validationErrorMessages?.length) {
                                            var _cer = await __fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == 1221560718 });
                                            if (_cer?.length > 0) {
                                                _msg = _cer[0]?.message;
                                            }
                                        }
                                        _validation[__fld?.identifier] = Yup.array().min(1, _msg).of(Yup.string().required(_msg)).required(_msg);
                                    }
                                });
                            }
                        }
                        if (__fld?.type == "AdvancedPassword") {
                            var _rmsg: any = '';
                            var _msg: any = '';
                            _msg = "Password & confirm password must match!!";
                            if (__fld?.validators?.length > 0) {
                                await __fld?.validators?.map(async (_val: any) => {
                                    var _errors = await formErrors.filter(function (el: any) { return el.identifier == "EmailAddress"; });
                                    if (_val?.identifier == "NotEmpty") {
                                        var _errors = await formErrors.filter(function (el: any) { return el.identifier == "NotEmpty"; });
                                        var _ms = await _errors.filter(function (el: any) { return el.code == 1221560718 });
                                        _rmsg = _ms[0]?.msg;
                                        if (__fld?.properties?.validationErrorMessages?.length) {
                                            var _cer = await __fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == 1221560718 });
                                            if (_cer?.length > 0) {
                                                _rmsg = _cer[0]?.message;
                                            }
                                        }
                                        _validation[__fld?.identifier + '-password'] = Yup.string().required(_rmsg);
                                        _validation[__fld?.identifier + '-confirmation'] = Yup.string().oneOf([Yup.ref(__fld?.identifier + '-password')], _msg).required(_rmsg);
                                    } else {
                                        _validation[__fld?.identifier + '-password'] = Yup.string();
                                        _validation[__fld?.identifier + '-confirmation'] = Yup.string().oneOf([Yup.ref(__fld?.identifier + '-password')], _msg);
                                    }
                                });
                            } else {
                                _validation[__fld?.identifier + '-password'] = Yup.string();
                                _validation[__fld?.identifier + '-confirmation'] = Yup.string().oneOf([Yup.ref(__fld?.identifier + '-password')], _msg);
                            }

                        }
                        if (__fld?.type == "FileUpload" || __fld?.type == "ImageUpload") {

                            if (__fld?.validators?.length > 0) {
                                var _rmsg: any = '';
                                var _msg: any = '';

                                var _re = await formErrors.filter(function (el: any) { return el.code == 1221565130 });
                                var validFileExtensions: any = __fld?.properties?.allowedMimeTypes;
                                await __fld?.validators?.map(async (_val: any) => {
                                    if (_val?.identifier == "NotEmpty") {
                                        var _errors = await formErrors.filter(function (el: any) { return el.identifier == "NotEmpty"; });
                                        var _ms = await _errors.filter(function (el: any) { return el.code == 1221560718 });
                                        _rmsg = _ms[0]?.msg;
                                        if (__fld?.properties?.validationErrorMessages?.length) {
                                            var _cer = await __fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == 1221560718 });
                                            if (_cer?.length > 0) {
                                                _rmsg = _cer[0]?.message;
                                            }
                                        }


                                        if (__fld?.validators[1]?.options !== undefined) {
                                            var minimum = __fld?.validators[1]?.options?.minimum ? __fld?.validators[1]?.options?.minimum : "0B";
                                            var maximum = __fld?.validators[1]?.options?.minimum ? __fld?.validators[1]?.options?.maximum : "0B";
                                            var maximum_val = maximum;
                                            var minimum_val = minimum;
                                            if (maximum.toLowerCase().split('b').pop() != maximum.toLowerCase()) {
                                                maximum_val = maximum.toLowerCase().split('b')[0] * 1;
                                            }
                                            if (maximum.toLowerCase().split('k').pop() != maximum.toLowerCase()) {
                                                maximum_val = maximum.toLowerCase().split('k')[0] * 1024;
                                            }
                                            if (maximum.toLowerCase().split('m').pop() != maximum.toLowerCase()) {
                                                maximum_val = maximum.toLowerCase().split('m')[0] * Math.pow(1024, 2);
                                            }
                                            if (maximum.toLowerCase().split('g').pop() != maximum.toLowerCase()) {
                                                maximum_val = maximum.toLowerCase().split('g')[0] * Math.pow(1024, 3);
                                            }

                                            if (minimum.toLowerCase().split('b').pop() != minimum.toLowerCase()) {
                                                minimum_val = minimum.toLowerCase().split('b')[0] * 1;
                                            }
                                            if (minimum.toLowerCase().split('k').pop() != minimum.toLowerCase()) {
                                                minimum_val = minimum.toLowerCase().split('k')[0] * 1024;
                                            }
                                            if (minimum.toLowerCase().split('m').pop() != minimum.toLowerCase()) {
                                                minimum_val = minimum.toLowerCase().split('m')[0] * Math.pow(1024, 2);
                                            }
                                            if (minimum.toLowerCase().split('g').pop() != minimum.toLowerCase()) {
                                                minimum_val = minimum.toLowerCase().split('g')[0] * Math.pow(1024, 3);
                                            }

                                            _validation[__fld?.identifier] = Yup.mixed<File>().test("fileFormat", "Unsupported File Format", (value: any) => {
                                                if (value) {
                                                    return (
                                                        validFileExtensions.includes(value.type)
                                                    );
                                                }
                                            }).test("file", `The file size between ${minimum} to ${maximum} `, (value: any) => {
                                                if (value) {
                                                    return (
                                                        value.size <= maximum_val && minimum_val <= value.size
                                                    );
                                                }
                                            }).required(_rmsg);
                                        } else {
                                            _validation[__fld?.identifier] = Yup.mixed().test("fileFormat", "Unsupported File Format", (value: any) => {
                                                if (value) {
                                                    return (
                                                        validFileExtensions.includes(value.type)
                                                    );
                                                } else {
                                                    return true;
                                                }
                                            }
                                            ).required(_rmsg);
                                        }
                                    } else {
                                        if (validFileExtensions?.length > 0) {
                                            _validation[__fld?.identifier] = Yup.mixed().test("fileFormat", "Unsupported File Format", (value: any) => {
                                                if (value) {
                                                    return (
                                                        validFileExtensions.includes(value.type)
                                                    );
                                                } else {
                                                    return true;
                                                }
                                            }
                                            );
                                        }
                                    }
                                });
                            } else {
                                var validFileExtensions: any = __fld?.properties?.allowedMimeTypes;
                                if (validFileExtensions?.length > 0) {
                                    _validation[__fld?.identifier] = Yup.mixed().test("fileFormat", "Unsupported File Format", (value: any) => {
                                        if (value) {
                                            return (
                                                validFileExtensions.includes(value.type)
                                            );
                                        } else {
                                            return true;
                                        }
                                    }
                                    );
                                }
                            }
                        }

                    })
                    if (_fld?.type == 'Text' || _fld?.type == 'Password' || _fld?.type == 'Url' || _fld?.type == 'Textarea' || _fld?.type == 'SingleSelect' || _fld?.type == 'CountrySelect' || _fld?.type == 'RadioButton' || _fld?.type == 'Telephone') {
                        if (_fld?.validators?.length > 0) {
                            await _fld?.validators?.map(async (_val: any) => {
                                if (_val?.identifier == "NotEmpty") {
                                    var _errors = await formErrors.filter(function (el: any) { return el.identifier == "NotEmpty"; });
                                    var _msg: any = '';
                                    var _ms = await _errors.filter(function (el: any) { return el.code == 1221560718 });
                                    _msg = _ms[0]?.msg;
                                    if (_fld?.properties?.validationErrorMessages?.length) {
                                        var _cer = await _fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == 1221560718 });
                                        if (_cer?.length > 0) {
                                            _msg = _cer[0]?.message;
                                        }
                                    }
                                    _validation[_fld?.identifier] = Yup.string().required(_msg);
                                }
                            });
                        }
                    }
                    if (_fld?.type == 'Email') {
                        if (_fld?.validators?.length > 0) {
                            var _rmsg: any = '';
                            var _msg: any = '';
                            await _fld?.validators?.map(async (_val: any) => {
                                var _errors = await formErrors.filter(function (el: any) { return el.identifier == "EmailAddress"; });
                                if (_val?.identifier == "EmailAddress") {
                                    var _ms = await _errors.filter(function (el: any) { return el.identifier == "EmailAddress" });
                                    _msg = _ms[0]?.msg;
                                    if (_fld?.properties?.validationErrorMessages?.length) {
                                        var _cer = await _fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == _ms[0]?.code });
                                        if (_cer?.length > 0) {
                                            _msg = _cer[0]?.message;
                                        }
                                    }
                                }
                                if (_val?.identifier == "NotEmpty") {
                                    var _errors = await formErrors.filter(function (el: any) { return el.identifier == "NotEmpty"; });
                                    var _ms = await _errors.filter(function (el: any) { return el.code == 1221560718 });
                                    _rmsg = _ms[0]?.msg;
                                    if (_fld?.properties?.validationErrorMessages?.length) {
                                        var _cer = await _fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == 1221560718 });
                                        if (_cer?.length > 0) {
                                            _rmsg = _cer[0]?.message;
                                        }
                                    }
                                    _validation[_fld?.identifier] = Yup.string().email(_msg).required(_rmsg);
                                } else {
                                    _validation[_fld?.identifier] = Yup.string().email(_msg);
                                }
                            });
                        }
                    }
                    if (_fld?.type == 'Number') {
                        if (_fld?.validators?.length > 0) {
                            var _rmsg: any = '';
                            var _msg: any = '';
                            await _fld?.validators?.map(async (_val: any) => {
                                if (_val?.identifier == "Number") {
                                    var _errors = await formErrors.filter(function (el: any) { return el.identifier == "Number"; });
                                    var _ms = await _errors.filter(function (el: any) { return el.identifier == "Number" });
                                    _msg = _ms[0]?.msg;
                                    if (_fld?.properties?.validationErrorMessages?.length) {
                                        var _cer = await _fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == _ms[0]?.code });
                                        if (_cer?.length > 0) {
                                            _msg = _cer[0]?.message;
                                        }
                                    }
                                }
                                if (_val?.identifier == "NotEmpty") {
                                    var _errors = await formErrors.filter(function (el: any) { return el.identifier == "NotEmpty"; });
                                    var _ms = await _errors.filter(function (el: any) { return el.code == 1221560718 });
                                    _rmsg = _ms[0]?.msg;
                                    if (_fld?.properties?.validationErrorMessages?.length) {
                                        var _cer = await _fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == 1221560718 });
                                        if (_cer?.length > 0) {
                                            _rmsg = _cer[0]?.message;
                                        }
                                    }
                                    _validation[_fld?.identifier] = Yup.number().typeError(_msg).required(_rmsg);
                                } else {
                                    _validation[_fld?.identifier] = Yup.number().typeError(_msg);
                                }
                            });
                        }
                    }
                    if (_fld?.type == 'Date') {
                        if (_fld?.validators?.length > 0) {
                            var _rmsg: any = '';
                            var _msg: any = '';
                            await _fld?.validators?.map(async (_val: any) => {
                                if (_val?.identifier == "NotEmpty") {
                                    var _errors = await formErrors.filter(function (el: any) { return el.identifier == "NotEmpty"; });
                                    var _ms = await _errors.filter(function (el: any) { return el.code == 1221560718 });
                                    _rmsg = _ms[0]?.msg;
                                    if (_fld?.properties?.validationErrorMessages?.length) {
                                        var _cer = await _fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == 1221560718 });
                                        if (_cer?.length > 0) {
                                            _rmsg = _cer[0]?.message;
                                        }
                                    }
                                    _validation[_fld?.identifier] = Yup.date().required(_rmsg);
                                } else {
                                    _validation[_fld?.identifier] = Yup.date();
                                }
                            });
                        }
                    }
                    if (_fld?.type == 'Url') {
                        if (_fld?.validators?.length > 0) {
                            var _rmsg: any = '';
                            var _msg: any = '';
                            var _re = await formErrors.filter(function (el: any) { return el.code == 1221565130 });
                            await _fld?.validators?.map(async (_val: any) => {
                                if (_val?.identifier == "NotEmpty") {
                                    var _errors = await formErrors.filter(function (el: any) { return el.identifier == "NotEmpty"; });
                                    var _ms = await _errors.filter(function (el: any) { return el.code == 1221560718 });
                                    _rmsg = _ms[0]?.msg;
                                    if (_fld?.properties?.validationErrorMessages?.length) {
                                        var _cer = await _fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == 1221560718 });
                                        if (_cer?.length > 0) {
                                            _rmsg = _cer[0]?.message;
                                        }
                                    }
                                    _validation[_fld?.identifier] = Yup.string().matches(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/, _re[0]?.msg).required(_rmsg);
                                } else {
                                    _validation[_fld?.identifier] = Yup.string().matches(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/, _re[0]?.msg);
                                }
                            });
                        } else {
                            _validation[_fld?.identifier] = Yup.string().matches(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/, _msg);
                        }
                    }
                    if (_fld?.type == 'Telephone') {
                        if (_fld?.validators?.length > 0) {
                            var _rmsg: any = '';
                            var _msg: any = '';
                            var _re = await formErrors.filter(function (el: any) { return el.code == 1221565130 });
                            await _fld?.validators?.map(async (_val: any) => {
                                if (_val?.identifier == "NotEmpty") {
                                    var _errors = await formErrors.filter(function (el: any) { return el.identifier == "NotEmpty"; });
                                    var _ms = await _errors.filter(function (el: any) { return el.code == 1221560718 });
                                    _rmsg = _ms[0]?.msg;
                                    if (_fld?.properties?.validationErrorMessages?.length) {
                                        var _cer = await _fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == 1221560718 });
                                        if (_cer?.length > 0) {
                                            _rmsg = _cer[0]?.message;
                                        }
                                    }
                                    _validation[_fld?.identifier] = Yup.string().matches(/^[0-9-+\s()]*$/, _re[0]?.msg).required(_rmsg);
                                } else {
                                    _validation[_fld?.identifier] = Yup.string().matches(/^[0-9-+\s()]*$/, _re[0]?.msg);
                                }
                            });
                        } else {
                            _validation[_fld?.identifier] = Yup.string().matches(/^[0-9-+\s()]*$/, _msg);
                        }
                    }
                    if (_fld?.type == "Checkbox" || _fld?.type == "MultiCheckbox" || _fld?.type == "MultiSelect") {
                        if (_fld?.validators?.length > 0) {
                            await _fld?.validators?.map(async (_val: any) => {
                                if (_val?.identifier == "NotEmpty") {
                                    var _errors = await formErrors.filter(function (el: any) { return el.identifier == "NotEmpty"; });
                                    var _msg: any = '';
                                    var _ms = await _errors.filter(function (el: any) { return el.code == 1221560718 });
                                    _msg = _ms[0]?.msg;
                                    if (_fld?.properties?.validationErrorMessages?.length) {
                                        var _cer = await _fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == 1221560718 });
                                        if (_cer?.length > 0) {
                                            _msg = _cer[0]?.message;
                                        }
                                    }
                                    _validation[_fld?.identifier] = Yup.array().min(1, _msg).of(Yup.string().required(_msg)).required(_msg);
                                }
                            });
                        }
                    }
                    if (_fld?.type == "AdvancedPassword") {
                        var _rmsg: any = '';
                        var _msg: any = '';
                        _msg = "Password & confirm password must match!!";
                        if (_fld?.validators?.length > 0) {
                            await _fld?.validators?.map(async (_val: any) => {
                                var _errors = await formErrors.filter(function (el: any) { return el.identifier == "EmailAddress"; });
                                if (_val?.identifier == "NotEmpty") {
                                    var _errors = await formErrors.filter(function (el: any) { return el.identifier == "NotEmpty"; });
                                    var _ms = await _errors.filter(function (el: any) { return el.code == 1221560718 });
                                    _rmsg = _ms[0]?.msg;
                                    if (_fld?.properties?.validationErrorMessages?.length) {
                                        var _cer = await _fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == 1221560718 });
                                        if (_cer?.length > 0) {
                                            _rmsg = _cer[0]?.message;
                                        }
                                    }
                                    _validation[_fld?.identifier + '-password'] = Yup.string().required(_rmsg);
                                    _validation[_fld?.identifier + '-confirmation'] = Yup.string().oneOf([Yup.ref(_fld?.identifier + '-password')], _msg).required(_rmsg);
                                } else {
                                    _validation[_fld?.identifier + '-password'] = Yup.string();
                                    _validation[_fld?.identifier + '-confirmation'] = Yup.string().oneOf([Yup.ref(_fld?.identifier + '-password')], _msg);
                                }
                            });
                        } else {
                            _validation[_fld?.identifier + '-password'] = Yup.string();
                            _validation[_fld?.identifier + '-confirmation'] = Yup.string().oneOf([Yup.ref(_fld?.identifier + '-password')], _msg);
                        }

                    }
                    if (_fld?.type == "FileUpload" || _fld?.type == "ImageUpload") {

                        if (_fld?.validators?.length > 0) {
                            var _rmsg: any = '';
                            var _msg: any = '';

                            var _re = await formErrors.filter(function (el: any) { return el.code == 1221565130 });
                            var validFileExtensions: any = _fld?.properties?.allowedMimeTypes;
                            await _fld?.validators?.map(async (_val: any) => {
                                if (_val?.identifier == "NotEmpty") {
                                    var _errors = await formErrors.filter(function (el: any) { return el.identifier == "NotEmpty"; });
                                    var _ms = await _errors.filter(function (el: any) { return el.code == 1221560718 });
                                    _rmsg = _ms[0]?.msg;
                                    if (_fld?.properties?.validationErrorMessages?.length) {
                                        var _cer = await _fld?.properties?.validationErrorMessages?.filter(function (el: any) { return el.code == 1221560718 });
                                        if (_cer?.length > 0) {
                                            _rmsg = _cer[0]?.message;
                                        }
                                    }


                                    if (_fld?.validators[1]?.options !== undefined) {
                                        var minimum = _fld?.validators[1]?.options?.minimum ? _fld?.validators[1]?.options?.minimum : "0B";
                                        var maximum = _fld?.validators[1]?.options?.minimum ? _fld?.validators[1]?.options?.maximum : "0B";
                                        var maximum_val = maximum;
                                        var minimum_val = minimum;
                                        if (maximum.toLowerCase().split('b').pop() != maximum.toLowerCase()) {
                                            maximum_val = maximum.toLowerCase().split('b')[0] * 1;
                                        }
                                        if (maximum.toLowerCase().split('k').pop() != maximum.toLowerCase()) {
                                            maximum_val = maximum.toLowerCase().split('k')[0] * 1024;
                                        }
                                        if (maximum.toLowerCase().split('m').pop() != maximum.toLowerCase()) {
                                            maximum_val = maximum.toLowerCase().split('m')[0] * Math.pow(1024, 2);
                                        }
                                        if (maximum.toLowerCase().split('g').pop() != maximum.toLowerCase()) {
                                            maximum_val = maximum.toLowerCase().split('g')[0] * Math.pow(1024, 3);
                                        }

                                        if (minimum.toLowerCase().split('b').pop() != minimum.toLowerCase()) {
                                            minimum_val = minimum.toLowerCase().split('b')[0] * 1;
                                        }
                                        if (minimum.toLowerCase().split('k').pop() != minimum.toLowerCase()) {
                                            minimum_val = minimum.toLowerCase().split('k')[0] * 1024;
                                        }
                                        if (minimum.toLowerCase().split('m').pop() != minimum.toLowerCase()) {
                                            minimum_val = minimum.toLowerCase().split('m')[0] * Math.pow(1024, 2);
                                        }
                                        if (minimum.toLowerCase().split('g').pop() != minimum.toLowerCase()) {
                                            minimum_val = minimum.toLowerCase().split('g')[0] * Math.pow(1024, 3);
                                        }

                                        _validation[_fld?.identifier] = Yup.mixed<File>().test("fileFormat", "Unsupported File Format", (value: any) => {
                                            if (value) {
                                                return (
                                                    validFileExtensions.includes(value.type)
                                                );
                                            }
                                        }).test("file", `The file size between ${minimum} to ${maximum} `, (value: any) => {
                                            if (value) {
                                                return (
                                                    value.size <= maximum_val && minimum_val <= value.size
                                                );
                                            }
                                        }).required(_rmsg);
                                    } else {
                                        _validation[_fld?.identifier] = Yup.mixed().test("fileFormat", "Unsupported File Format", (value: any) => {
                                            if (value) {
                                                return (
                                                    validFileExtensions.includes(value.type)
                                                );
                                            } else {
                                                return true;
                                            }
                                        }
                                        ).required(_rmsg);
                                    }
                                } else {
                                    if (validFileExtensions?.length > 0) {
                                        _validation[_fld?.identifier] = Yup.mixed().test("fileFormat", "Unsupported File Format", (value: any) => {
                                            if (value) {
                                                return (
                                                    validFileExtensions.includes(value.type)
                                                );
                                            } else {
                                                return true;
                                            }
                                        }
                                        );
                                    }
                                }
                            });
                        } else {
                            var validFileExtensions: any = _fld?.properties?.allowedMimeTypes;
                            if (validFileExtensions?.length > 0) {
                                _validation[_fld?.identifier] = Yup.mixed().test("fileFormat", "Unsupported File Format", (value: any) => {
                                    if (value) {
                                        return (
                                            validFileExtensions.includes(value.type)
                                        );
                                    } else {
                                        return true;
                                    }
                                }
                                );
                            }
                        }
                    }

                });
            }
        });
        SetSchema(_validation);
    }

    const sendEmailtoSender = async (_options: any, files: any, files_identifier: any) => {
        let _findl: any = new Object();
        let _markers: any = [];

        if (Object.keys(files_identifier).length > 0) {
            Object.keys(files_identifier).map((_files: any, index: any) => {
                delete formik?.values[_files];
            })
        }
        let fdata: any = formik?.values;
        await Object.keys(formik?.values).map(async (_val: any, i: any) => {
            let _tmp: any = new Object();

            await _stpes?.map(async (_ctep: any, index: any) => {
                if (_ctep?.type == "Page") {
                    await _ctep?.renderables?.map(async (_fld: any) => {

                        if (_fld?.type != 'GridRow' && _fld?.type != 'GridColumn' && _fld?.type != 'Fieldset' && _fld?.type != 'AdvancedPassword') {
                            if (_fld?.identifier == _val) {
                                _tmp['key'] = _fld?.label;
                                _tmp['val'] = formik.values[_val]?.toString();
                                _markers.push(_tmp);
                                fdata[_fld?.identifier] = formik.values[_val]?.toString();
                            }
                        } else if (_fld?.type == 'AdvancedPassword') {
                            if (_fld?.identifier + '-confirmation' == _val) {
                                _tmp['key'] = _fld?.label;
                                _tmp['val'] = formik.values[_val].toString();
                                _markers.push(_tmp);
                                fdata[_fld?.identifier] = formik.values[_val].toString();
                            }
                        } else {
                            if (_fld?.renderables?.length > 0) {
                                if (_fld?.type != "FileUpload" || _fld?.type != "ImageUpload") {
                                    _fld?.renderables?.map((_sfl: any) => {
                                        if (_sfl?.identifier == _val) {
                                            _tmp['key'] = _sfl?.label;
                                            _tmp['val'] = formik.values[_val].toString();
                                            _markers.push(_tmp);
                                            fdata[_sfl?.identifier] = formik.values[_val].toString();
                                        }
                                    })
                                }
                            }
                        }
                    });
                }
            });



            let _updated_sub = _options.subject.replaceAll('{' + _val + '}', formik.values[_val]);
            let _updated_sadress = _options.senderAddress.replaceAll('{' + _val + '}', formik.values[_val]);
            let _usname = _options.senderName.replaceAll('{' + _val + '}', formik.values[_val]);
            let _title = _options.title.replaceAll('{' + _val + '}', formik.values[_val]);
            _options.subject = _options?.subject ? _updated_sub : "";
            _options.senderAddress = _options?.senderAddress ? _updated_sadress : "";
            _options.senderName = _options?.senderName ? _usname : "";
            _options.title = _options?.title ? _title : "";
        });

        if (_options?.recipients) {
            let _updated_R: any = new Object();
            await Object.keys(_options?.recipients).map((_val: any, i: any) => {
                let _valll = _val;
                let __cl_val = _options?.recipients[_val];
                Object.keys(formik?.values).map((_sl: any, i: any) => {
                    _valll = _valll.replaceAll('{' + _sl + '}', formik.values[_sl]);
                    __cl_val = __cl_val.replaceAll('{' + _sl + '}', formik.values[_sl]);
                });
                _updated_R[_valll] = __cl_val;
            });
            _options.recipients = _updated_R;
        }

        if (_options?.blindCarbonCopyRecipients) {
            let _blindCarbonCopyRecipients: any = new Object();
            await Object.keys(_options?.blindCarbonCopyRecipients).map((_val: any, i: any) => {
                let _valll = _val;
                let __cl_val = _options?.blindCarbonCopyRecipients[_val];
                Object.keys(formik?.values).map((_sl: any, i: any) => {
                    _valll = _valll.replaceAll('{' + _sl + '}', formik.values[_sl]);
                    __cl_val = __cl_val.replaceAll('{' + _sl + '}', formik.values[_sl]);
                });
                _blindCarbonCopyRecipients[_valll] = __cl_val;
            });
            _options.blindCarbonCopyRecipients = _blindCarbonCopyRecipients;

        }

        if (_options?.carbonCopyRecipients) {
            let _carbonCopyRecipients: any = new Object();
            await Object.keys(_options?.carbonCopyRecipients).map((_val: any, i: any) => {
                let _valll = _val;
                let __cl_val = _options?.carbonCopyRecipients[_val];
                Object.keys(formik?.values).map((_sl: any, i: any) => {
                    _valll = _valll.replaceAll('{' + _sl + '}', formik.values[_sl]);
                    __cl_val = __cl_val.replaceAll('{' + _sl + '}', formik.values[_sl]);
                });
                _carbonCopyRecipients[_valll] = __cl_val;
            });
            _options.carbonCopyRecipients = _carbonCopyRecipients;
        }

        if (_options?.replyToRecipients) {
            let _replyToRecipients: any = new Object();
            await Object.keys(_options?.replyToRecipients).map((_val: any, i: any) => {
                let _valll = _val;
                let __cl_val = _options?.replyToRecipients[_val];
                Object.keys(formik?.values).map((_sl: any, i: any) => {
                    _valll = _valll.replaceAll('{' + _sl + '}', formik.values[_sl]);
                    __cl_val = __cl_val.replaceAll('{' + _sl + '}', formik.values[_sl]);
                });
                _replyToRecipients[_valll] = __cl_val;
            });
            _options.replyToRecipients = _replyToRecipients;
        }

        var attachments: any = [];

        if (Object.keys(files_identifier).length > 0) {
            var __data = await fileUpload(files).then(async (_data) => {
                if (_data) {
                    if (_data?.uploads) {
                        Object.keys(files_identifier).map((_files: any, index: any) => {
                            if (_data?.uploads[_files] !== undefined) {
                                _data?.uploads[_files].map((file: any, i: any) => {
                                    attachments.push(file);
                                });
                            }
                        });
                    }
                }
            }, (error) => {
            })
            if (attachments.length > 0) {
                _options.attachments = attachments;
            }
        }

        _findl['soptions'] = _options;
        _findl['fdata'] = fdata;
        _findl['form'] = _fdata?.identifier;
        _findl['markers'] = _markers;
        _findl['uid'] = data?.uid;
        let _resp = await submitForm(_findl);
    }

    const redirecttoPage = async (_pid: any) => { 
        let _pagedata = config?.pages?.find((pg: any) => {
            return pg?.uid == _pid;
        });
        if(_pagedata){  
            push(_pagedata?.slugurl);
        }
    }

    const formik = useFormik({
        initialValues: data?.initialValues,
        validationSchema: Yup.object().shape(schema),
        onSubmit: (values, { resetForm }) => {
            if (_fdata?.finishers?.length > 0) {
                var _isredirect = _fdata?.finishers?.filter(function (el: any) { return el?.identifier == "Redirect"; });
                var _isconfirmation = _fdata?.finishers?.filter(function (el: any) { return el?.identifier == "Confirmation"; });
                var _isemailtosender = _fdata?.finishers?.filter(function (el: any) { return el?.identifier == "EmailToSender"; });
                var _isemailtoreceiver = _fdata?.finishers?.filter(function (el: any) { return el?.identifier == "EmailToReceiver"; });
                var files = new FormData();
                var files_identifier: any = {};
                _fdata?.renderables?.map((_fld: any, index: any) => {
                    _fld?.renderables?.map((_fd: any, index: any) => {
                        if (_fd.type == "FileUpload" || _fd.type == "ImageUpload") {
                            files_identifier[_fd.identifier] = _fd.identifier;
                            if (values[_fd.identifier] !== undefined) {
                                files.set(_fd.identifier, _fd?.properties?.saveToFileMount);
                                files.append(_fd.identifier, values[_fd.identifier], values[_fd.identifier]?.name);
                            }
                        }
                    });
                });
                if (_isemailtosender?.length > 0) {
                    sendEmailtoSender(_isemailtosender[0]?.options, files, files_identifier);
                }
                if (_isemailtoreceiver?.length > 0) {
                    sendEmailtoSender(_isemailtoreceiver[0]?.options, files, files_identifier);
                }
                if (_isredirect?.length > 0) {
                    let _pid = _isredirect[0]?.options?.pageUid;
                    redirecttoPage(_pid);
                } else {
                    if (_isconfirmation?.length > 0) {
                        let _msg = _isconfirmation[0]?.options?.message;
                        SetConfirmmessage(_msg);
                    } else {
                        let _msg = "Form Submitted Successfully!!";
                        SetConfirmmessage(_msg);
                    }
                }
                resetForm();
            } else {
                let _msg = "Form Submitted Successfully!!";
                SetConfirmmessage(_msg);
            }
        },
    });

    const getError = (_field: any) => {
        if (formik.errors[_field]) {
            return (<p className='mt-2 text-sm text-red-600 dark:text-red-500'>{String(formik.errors[_field])}</p>);
        } else {
            return "";
        }
    }

    const renderFields = (_ctep: any, index: any) => {
        return (
            _ctep?.renderables?.map((_fld: any, _i: any) => (
                <div key={_fld?.identifier + index + _ctep?.identifier + _i} className={`form-group mb-4 ${_ctep?.type == "GridRow" ? 'col flex-auto px-[15px]' : _ctep?.type == "GridColumn" ?"row" :""}`}>
                    {_fld?.type != "Checkbox" && _fld?.type != "Hidden" && _fld?.type != "StaticText" && _fld?.type != "ContentElement" && _fld?.type != "Fieldset" && _fld?.type != "DatePicker" ?
                        <label htmlFor={_fld?.identifier} className='block text-sm font-medium leading-6  font-[400] text-gray-900 mb-2'>
                            {_fld?.label}
                            {_fld?.properties?.fluidAdditionalAttributes?.required ?
                                <span className="required">*</span>
                                : null}
                        </label>
                        : null}
                    {_fld?.type == "Text" ?

                        <input
                            name={_fld?.identifier}
                            placeholder={_fld?.properties?.fluidAdditionalAttributes?.placeholder}
                            id={_fld?.identifier}
                            step={index + 1}
                            type="text"
                            required={!!_fld?.properties?.fluidAdditionalAttributes?.required}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={formik.handleChange}
                            value={formik.values[_fld?.identifier]}
                        />

                        : null}

                    {
                        _fld?.type == "FileUpload" || _fld?.type == "ImageUpload" ?

                            <input
                                name={_fld?.identifier}
                                placeholder={_fld?.properties?.fluidAdditionalAttributes?.placeholder}
                                id={_fld?.identifier}
                                step={index + 1}
                                type="file"
                                required={!!_fld?.properties?.fluidAdditionalAttributes?.required}
                                // className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                className="g-white border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                file:mr-5 file:py-2.5 file:px-6
                                file:rounded-r-lg rounded-b-lg  file:border-0
                                file:text-sm file:font-medium
                                file:bg-[#f8f9fa] file:text-gray-900
                                hover:file:cursor-pointer hover:file:bg-[#f8f9fa]
                                hover:file:text-gray-900"
                                accept={_fld?.properties?.allowedMimeTypes}
                                onChange={(event: any) => {
                                    formik.setFieldValue(_fld?.identifier, event?.currentTarget?.files[0]);
                                }}
                            />
                            : null
                    }
                    {_fld?.type == "Email" ?

                        <input
                            name={_fld?.identifier}
                            placeholder={_fld?.properties?.fluidAdditionalAttributes?.placeholder}
                            id={_fld?.identifier}
                            step={index + 1}
                            type="email"
                            required={!!_fld?.properties?.fluidAdditionalAttributes?.required}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={formik.handleChange}
                            value={formik.values[_fld?.identifier]}
                        />


                        : null}
                    {_fld?.type == "Textarea" ?

                        <textarea
                            name={_fld?.identifier}
                            placeholder={_fld?.properties?.fluidAdditionalAttributes?.placeholder}
                            id={_fld?.identifier}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={formik.handleChange}
                            value={formik.values[_fld?.identifier]}
                        />

                        : null}
                    {_fld?.type == "Password" ?

                        <input
                            name={_fld?.identifier}
                            placeholder={_fld?.properties?.fluidAdditionalAttributes?.placeholder}
                            id={_fld?.identifier}
                            step={index + 1}
                            type="password"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={formik.handleChange}
                            value={formik.values[_fld?.identifier]}
                        />

                        : null}
                    {_fld?.type == "Telephone" ?

                        <input
                            name={_fld?.identifier}
                            placeholder={_fld?.properties?.fluidAdditionalAttributes?.placeholder}
                            id={_fld?.identifier}
                            step={index + 1}
                            type="tel"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={formik.handleChange}
                            value={formik.values[_fld?.identifier]}
                        />

                        : null}
                    {_fld?.type == "Url" ?

                        <input
                            name={_fld?.identifier}
                            placeholder={_fld?.properties?.fluidAdditionalAttributes?.placeholder}
                            id={_fld?.identifier}
                            step={index + 1}
                            type="url"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={formik.handleChange}
                            value={formik.values[_fld?.identifier]}
                        />
                        : null}
                    {_fld?.type == "Number" ?

                        <input
                            name={_fld?.identifier}
                            placeholder={_fld?.properties?.fluidAdditionalAttributes?.placeholder}
                            id={_fld?.identifier}
                            step={index + 1}
                            type="number"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={formik.handleChange}
                            value={formik.values[_fld?.identifier]}
                        />

                        : null}
                    {_fld?.type == "Date" ?

                        <input
                            name={_fld?.identifier}
                            placeholder={_fld?.properties?.fluidAdditionalAttributes?.placeholder}
                            id={_fld?.identifier}
                            step={index + 1}
                            type="date"
                            pattern="([0-9]{4})-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={formik.handleChange}
                            value={formik.values[_fld?.identifier]}
                            min={_fld?.properties?.fluidAdditionalAttributes?.min}
                            max={_fld?.properties?.fluidAdditionalAttributes?.max}
                        />

                        : null}
                    {_fld?.type == "Checkbox" ?

                        <div className='flex items-center h-5'>
                            <input
                                name={_fld?.identifier}
                                id={_fld?.identifier}
                                step={index + 1}
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                onChange={formik.handleChange}
                                value={1}
                            />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor={_fld?.identifier}>
                                {_fld?.label}
                            </label>
                        </div>

                        : null}
                    {_fld?.type == "Hidden" ?

                        <input
                            name={_fld?.identifier}
                            id={_fld?.identifier}
                            step={index + 1}
                            type="hidden"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={formik.handleChange}
                            value={formik.values[_fld?.identifier]}
                        />

                        : null}
                    {_fld?.type == "SingleSelect" ?

                        <select
                            name={_fld?.identifier}
                            id={_fld?.identifier}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={formik.handleChange}
                            value={formik.values[_fld?.identifier]}
                        >
                            <option value="">{_fld?.properties?.prependOptionLabel ? _fld?.properties?.prependOptionLabel : "Select"}</option>
                            {_fld?.properties?.options ?
                                Object.keys(_fld?.properties?.options).map((_val: any, i: any) => (
                                    <option key={_val + i + _fld?.identifier} value={_val}>
                                        {_fld?.properties?.options[_val]}
                                    </option>
                                ))
                                : null}

                        </select>

                        : null}
                    {_fld?.type == "MultiSelect" ?
                        <select
                            name={_fld?.identifier}
                            id={_fld?.identifier}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={formik.handleChange}
                            value={formik.values[_fld?.identifier]}
                            multiple
                        >
                            <option value="">{_fld?.properties?.prependOptionLabel ? _fld?.properties?.prependOptionLabel : "Select"}</option>
                            {_fld?.properties?.options ?
                                Object.keys(_fld?.properties?.options).map((_val: any, i: any) => (
                                    <option key={_val + i + _fld?.identifier} value={_val}>
                                        {_fld?.properties?.options[_val]}
                                    </option>
                                ))
                                : null}

                        </select>
                        : null}
                    {_fld?.type == "RadioButton" ?
                        _fld?.properties?.options ?
                            Object.keys(_fld?.properties?.options).map((_val: any, i: any) => (
                                <div className='flex items-center' key={_val + i + _fld?.identifier}>
                                    <input
                                        name={_fld?.identifier}
                                        id={_val}
                                        step={index + 1}
                                        type="radio"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={formik.handleChange}
                                        value={_val}
                                        checked={formik.values[_fld?.identifier] == _val}
                                    />
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor={_val}>{_fld?.properties?.options[_val]}</label>
                                </div>
                            ))
                            : null
                        : null}
                    {_fld?.type == "MultiCheckbox" ?
                        _fld?.properties?.options ?
                            Object.keys(_fld?.properties?.options).map((_val: any, i: any) => (
                                <div className='flex items-center h-5' key={_val + i + _fld?.identifier}>
                                    <input
                                        name={_fld?.identifier}
                                        id={_fld?.identifier + "-" + (i + 1)}
                                        step={index + 1}
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                        onChange={formik.handleChange}
                                        value={_val}
                                        checked={!!formik?.values[_fld?.identifier]?.includes(_val)}
                                    />
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor={_fld?.identifier + "-" + (i + 1)}> {_fld?.properties?.options[_val]}
                                    </label>
                                </div>
                            ))
                            : null
                        : null}
                    {_fld?.type == "CountrySelect" ?
                        <select
                            name={_fld?.identifier}
                            id={_fld?.identifier}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={formik.handleChange}
                            value={formik.values[_fld?.identifier]}
                        >
                            <option value="">{_fld?.properties?.prependOptionLabel ? _fld?.properties?.prependOptionLabel : "Select"}</option>
                            {data?.countries ?
                                data?.countries.map((_val: any, i: any) => (
                                    <option key={_val + i + _fld?.identifier} value={_val?.alpha2IsoCode}>
                                        {_val?.name}
                                    </option>
                                ))
                                : null}

                        </select>
                        : null}

                    {_fld?.type == "StaticText" ?
                        <>
                            <h2>{_fld?.label}</h2>
                            <p>{_fld?.properties?.text}</p>
                        </>
                        : null}
                    {_fld?.type == "AdvancedPassword" ?
                        <>

                            <input
                                name={_fld?.identifier + "-password"}
                                placeholder={_fld?.properties?.fluidAdditionalAttributes?.placeholder}
                                id={_fld?.identifier}
                                step={index + 1}
                                type="password"
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={formik.handleChange}
                                value={formik.values[_fld?.identifier]}
                            />
                            {getError(_fld?.identifier + '-password')}
                            {_fld?.properties?.confirmationLabel ?
                                <label htmlFor={_fld?.identifier + '-confirmation'}>{_fld?.properties?.confirmationLabel}</label>

                                : null}
                            <input
                                name={_fld?.identifier + "-confirmation"}
                                placeholder={_fld?.properties?.fluidAdditionalAttributes?.placeholder}
                                id={_fld?.identifier + '-confirmation'}
                                step={index + 1}
                                type="password"
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={formik.handleChange}
                                value={formik.values[_fld?.identifier]}
                            />
                            {getError(_fld?.identifier + '-confirmation')}
                        </>
                        : null}

                    {/* {_fld?.type == "ContentElement" ? 
                // <RenderElement uid={_fld?.properties?.contentElementUid} config={config} ></RenderElement>
                renderElement(_fld?.properties?.contentElementUid,config)
                :null} */}

                    {_fld?.type == "Fieldset" ?
                        <fieldset id={_fld?.identifier} className="form-group mb-3">
                            <legend>{_fld?.label}</legend>
                            {_fld?.renderables?.length > 0 ?
                                renderFields(_fld, index)
                                : null}
                        </fieldset>
                        : null}

                    {_fld?.type == "GridRow" ?
                        <div className='row flex flex-wrap -mx-[15px]'>
                            {_fld?.renderables?.length > 0 ?
                                renderFields(_fld, index)
                                : null}
                        </div>
                        : null}
                    {_fld?.type == "GridColumn" ?
                        <div className='row px-5 -mx-[15px]'>
                            {_fld?.renderables?.length > 0 ?
                                renderFields(_fld, index)
                                : null}
                        </div>
                        : null}

                    {getError(_fld?.identifier)}

                    {_fld?.properties?.elementDescription ?
                        <small className='mt-2 text-sm text-gray-500 dark:text-gray-400'>{_fld?.properties?.elementDescription}</small>
                        : null}
                </div>
            )))
    }

    return (
        <>
            {confirmmessage != null ?
                <div className='mt-2 text-sm text-green-600  font-bold  dark:text-green-500'>
                    <p>{confirmmessage}</p>
                </div>
                :
                _stpes?.length > 0 ?
                    <form onSubmit={formik.handleSubmit} >
                        {_stpes?.map((_ctep: any, index: any) => (
                            <div className={`form ${visiblestep == index ? 'show' : 'hidden'}`} key={_ctep?.type + _ctep?.identifier + index}>
                                <h2>{_ctep?.label}</h2>
                                <div className="">
                                    {_ctep?.type == "Page" ?
                                        renderFields(_ctep, index)
                                        :
                                        <div>
                                            {_stpes?.map((_ctep: any, index: any) => (
                                                _ctep?.type == "Page" ?
                                                    _ctep?.renderables?.map((_fld: any, index: any) => (
                                                        _fld?.type != "GridRow" && 
                                                        _fld?.type != "GridColumn" && _fld?.type != "Fieldset" && _fld?.type != "Hidden" && _fld?.type != "StaticText" && _fld?.type != "ContentElement" && _fld?.type != "DatePicker" && _fld?.type != "FileUpload" && _fld?.type != "ImageUpload" && _fld?.type != "AdvancedPassword" ?
                                                            <div key={_fld?.identifier + index + _ctep?.identifier + index} className='row'>
                                                                <div className='col'>{_fld?.label}</div>
                                                                <div className='col'>{formik.values[_fld?.identifier]}</div>
                                                            </div>
                                                            : _fld?.renderables?.length > 0 ?
                                                                _fld?.renderables?.map((_sfld: any) => (
                                                                    <div key={_sfld?.identifier + index + _sfld?.identifier + index} className='row'>
                                                                        <div className='col'>{_sfld?.label}</div>
                                                                        <div className='col'>{formik.values[_sfld?.identifier]}</div>
                                                                    </div>
                                                                ))
                                                                : null
                                                    )) : null))}
                                        </div>}

                                    {_stpes?.length == 1 ?
                                        <button type="submit" onClick={(e) => formik.handleSubmit()} className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">{_fdata?.renderingOptions?.submitButtonLabel}</button>
                                        :
                                        index == 0 ?
                                            <button type="button" className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" onClick={(e) => nextStep()} >{_ctep?.renderingOptions?.nextButtonLabel}</button>
                                            : index > 0 ?
                                                <>
                                                    <button type="button" onClick={(e) => prvStep()} className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">{_ctep?.renderingOptions?.previousButtonLabel}</button>
                                                    {index == (_stpes?.length - 1) ?
                                                        <button type="submit" onClick={(e) => formik.handleSubmit()} className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">{_fdata?.renderingOptions?.submitButtonLabel}</button>
                                                        : <button type="button" className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" onClick={(e) => nextStep()} >{_ctep?.renderingOptions?.nextButtonLabel}</button>}
                                                </>
                                                : null
                                    }
                                </div>
                            </div>
                        ))}
                    </form>
                    : null
            }
        </>
    )
}
