import { DataType, ParameterValueType, PeriodType } from './Namespaces/Tableau';
import { DataValue } from './DataTableInterfaces';
import { EventListenerManager } from './EventInterfaces';
/**
 * Represents a parameter in Tableau and provides ways to introspect the parameter and change its values.
 */
export interface Parameter extends EventListenerManager {
    /**
     * @returns  The display name of this parameter.
     */
    readonly name: string;
    /**
     * @returns  DataValue representing the current value of the parameter.
     */
    readonly currentValue: DataValue;
    /**
     * @returns  The type of data this parameter holds.
     */
    readonly dataType: DataType;
    /**
     * @returns  The allowable set of values this parameter can take.
     */
    readonly allowableValues: ParameterDomainRestriction;
    /**
     * @return   A unique identifier for this Parameter.
     */
    readonly id: string;
    /**
     * Modifies this parameter and assigns it a new value. The new value must fall within
     * the domain restrictions defined by `allowableValues`. If the domain restriction is `ParameterValueType.Range`,
     * be sure to check the `allowableValues` before assigning a new value. If the new value is out of range, the
     * updated value will be set to either the `minValue` or the `maxValue` of the allowable range. If a step size is also specified
     * and the new value does not fall on the step intervals, the updated value will be set to the closest, lower step,
     * or closest, earlier date. If the domain restriction is type `ParameterValueType.List`, and there are aliases defined for the list,
     * the aliased value should be passed to the method.
     *
     * @param newValue  The new value to assign to this parameter.
     * *Note:* For changing `Date` parameters, UTC Date objects are expected.
     * @returns         The updated `DataValue`. The promise is rejected if `newValue` is invalid. However, if the domain restriction
     * is type `AllowableValuesType.Range`, and the `newValue` is out of the range bounds, the parameter gets set to the `minValue`
     * or the `maxValue` of the range (whichever is closer). If the range has a `stepSize` or `dateStepPeriod`, the parameter gets set
     * to the closest, lower step, or the closest, earlier date.
     *
     */
    changeValueAsync(newValue: string | number | boolean | Date): Promise<DataValue>;
}
/**
 * Represents the allowable set of values which a parameter can be set to.
 */
export interface ParameterDomainRestriction {
    /**
     * @returns  The type of restriction we have on the parameter's domain. This value
     *           will effect what other properties are configured on this object.
     */
    readonly type: ParameterValueType;
    /**
     * @returns  If `ParameterValueType.List`, the array will be the list of
     *           values which the parameter is allowed to take.
     */
    readonly allowableValues?: Array<DataValue>;
    /**
     * @returns  If `ParameterValueType.Range`, the value will be the lower
     *           bound of allowable values for the parameter.
     */
    readonly minValue?: DataValue;
    /**
     * @returns  If `ParameterValueType.Range`, the value will be the upper
     *           bound of allowable values for the parameter.
     */
    readonly maxValue?: DataValue;
    /**
     * @returns  If `ParameterValueType.Range`, the value will
     *           define the step size used in the parameter UI control slider.
     *           Note that if you specify a new value for the parameter, using the `changeValueAsync()` method,
     *           that does not align on the `stepSize` interval, the value will be set to the closest, lower interval.
     *           For example, if the `stepSize` was 5 and the steps were 1, 5, 10, if the new value specified
     *           was 8, the value 5 would be used instead.
     */
    readonly stepSize?: number;
    /**
     * @returns  If `ParameterValueType.Range`, this defines the step date period
     *           used in the Parameter UI control slider. Note that if you specify a new value for the parameter,
     *           using the `changeValueAsync()` method, that does not align on the `dateStepPeriod` interval, the
     *           value will be set to the closest, earlier date.
     */
    readonly dateStepPeriod?: PeriodType;
}
