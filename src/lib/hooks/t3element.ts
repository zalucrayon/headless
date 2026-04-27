export const t3element = [
    'header',
    'text',
    'textpic',
    'image',
    'textmedia',
    'bullets',
    'table',
    'uploads',
    'list',
    'div',
    'html',
    'form_formframework',
    // 'shortcut',
    // 'menu_pages',
    // 'menu_subpages',
    // 'menu_abstract',
    // 'menu_section_pages',
    // 'menu_sitemap',
    // 'menu_sitemap_pages',
    // 'menu_section',
    // 'menu_recently_updated',
    // 'menu_related_pages',
    // 'menu_categorized_pages',
    // 'menu_categorized_content',
    // 'felogin_login',
    // 'news_newsliststicky',
    // 'news_newsdetail',
    // 'news_pi1',
    // 'news_newsselectedlist',
    // 'news_newsdatemenu',
    // 'news_categorylist',
    // 'news_taglist',
    // 'news_newssearchform',
    // 'news_newssearchresult', 
];
export const formErrors = [
    { code: 1221551320, identifier: "Alphanumeric", msg: "The given value was not a valid alphanumeric string." },
    { code: 1475002976, identifier: "Count", msg: "You must enter a countable value." },
    { code: 1475002994, identifier: "Count", msg: "You must select between %s to %s elements." },
    { code: 1521293685, identifier: "DateRange", msg: "You must enter an instance of DateTime." },
    { code: 1521293686, identifier: "DateRange", msg: "You must select a date before %s." },
    { code: 1521293687, identifier: "DateRange", msg: "You must select a date after %s." },
    { code: 1238087674, identifier: "DateTime", msg: "The given value was not a valid DateTime. Got: '%s'." },
    { code: 1221559976, identifier: "EmailAddress", msg: "The given value was not a valid email address." },
    { code: 1505303626, identifier: "FileSize", msg: "You must enter an instance of File." },
    { code: 1505305752, identifier: "FileSize", msg: "You must select a file that is larger than %s in size." },
    { code: 1505305753, identifier: "FileSize", msg: "You must select a file that is no larger than %s." },
    { code: 1221560288, identifier: "Float", msg: "The given value was not a valid float." },
    { code: 1221560494, identifier: "Integer", msg: "The given value was not a valid integer." },
    { code: 1221560910, identifier: "NotEmpty", msg: "This field was NULL." },
    { code: 1221560718, identifier: "NotEmpty", msg: "This field is mandatory." },
    { code: 1347992400, identifier: "NotEmpty", msg: "This field is mandatory." },
    { code: 1347992453, identifier: "NotEmpty", msg: "This field is mandatory." },
    { code: 1221563685, identifier: "Number", msg: "The given value was not a valid number." },
    { code: 1221563685, identifier: "NumberRange", msg: "The given value was not a valid number." },
    { code: 1221561046, identifier: "NumberRange", msg: "The given value was not in the valid range (%s - %s)." },
    { code: 1221565130, identifier: "RegularExpression", msg: "The given value did not match the pattern." },
    { code: 1238110957, identifier: "StringLength", msg: "The given object could not be converted to a string." },
    { code: 1269883975, identifier: "StringLength", msg: "The given value was not a valid string." },
    { code: 1428504122, identifier: "StringLength", msg: "The length of the given string was not between %s and %s characters." },
    { code: 1238108068, identifier: "StringLength", msg: "The length of the given string is less than %s characters." },
    { code: 1238108069, identifier: "StringLength", msg: "The length of the given string exceeded %s characters." },
];
 
 
export const getElementData = async (data: any, config: any, element: any) => {
    return data;
};  
      
export const getFormDefination = (eid: any, config: any) => {
    if(eid){
        let _formdata = eid?.form;
        let _stpes: any = _formdata?.renderables;
        let _objfrile: any = new Object();
        if (_stpes?.length > 0) { 
            _stpes?.map((_stp: any) => {
                if (_stp.type == "Page") {
                    _stp?.renderables?.map(async (_fld: any) => {
                        if (_fld?.type != 'GridRow' && _fld?.type != 'Fieldset') {
                            _objfrile[_fld?.identifier] = _fld?.defaultValue;
                        } else if (_fld?.type != 'Checkbox') {
                            _objfrile[_fld?.identifier] = false;
                        } else {
                            if (_fld?.renderables?.length > 0) {
                                _fld?.renderables?.map((_sfl: any) => {
                                    _objfrile[_sfl?.identifier] = _sfl?.defaultValue;
                                })
                            }
                        }
                        if (_fld?.type == "CountrySelect") {
                            let _Cntr: any = config?.countries;
                            _Cntr = Object.values(_Cntr);
                            let _sorted: any = [];
                            if (_fld?.properties?.onlyCountries) {
                                Object.keys(_fld?.properties?.onlyCountries).map(async (_itm: any) => {
                                    _Cntr.map((_val: any, i: any) => {
                                        if (_val?.alpha2IsoCode == _fld?.properties?.onlyCountries[_itm]) {
                                            _sorted.push(_val);
                                        }
                                    }) 
                                });
                            }
                            if (_fld?.properties?.excludeCountries) {
                                Object.keys(_fld?.properties?.excludeCountries).map((_itm: any) => {
                                    _Cntr.map((_val: any, i: any) => {
                                        if (!_fld?.properties?.excludeCountries.includes(_val?.alpha2IsoCode)) {
                                            const result = _sorted.some((obj: any) => { return obj.alpha2IsoCode == _val?.alpha2IsoCode });
                                            if (!result) {
                                                _sorted.push(_val);
                                            }
                                        }
                                    }) 
                                });
                            }
                            let __sval = _Cntr;
                            if (_sorted?.length > 0) {
                                __sval = _sorted;
                            }
                            let _final: any = [];
                            if (_fld?.properties?.prioritizedCountries) {
                                Object.keys(_fld?.properties?.prioritizedCountries).map((_itm: any) => {
                                    __sval?.map((_val: any, i: any) => {
                                        if (_val?.alpha2IsoCode == _fld?.properties?.prioritizedCountries[_itm]) {
                                            _final.push(_val);
                                        }
                                    }) 
                                });
                                __sval?.map((_val: any, i: any) => {
                                    if (!_fld?.properties?.prioritizedCountries.includes(_val?.alpha2IsoCode)) {
                                        _final.push(_val);
                                    }
                                }) 
                            }
                            if (_final?.length > 0) {
                                eid.countries = _final;
                            } else {
                                eid.countries = _Cntr;
                            }
                        }
                    });
                }
            })
        }
        eid.initialValues = _objfrile;
        return eid; 
    }else{
        return eid;
    }
};   

 