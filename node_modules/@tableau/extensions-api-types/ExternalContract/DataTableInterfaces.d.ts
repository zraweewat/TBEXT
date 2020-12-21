import { DataType } from './Namespaces/Tableau';
import { MarkInfo } from './SelectionInterfaces';
export interface Column {
    /**
     * @returns  The name of the column.
     */
    readonly fieldName: string;
    /**
     * @returns The data type of the column. Possible values are
     *           float, integer, string, boolean, date, and datetime.
     */
    readonly dataType: DataType;
    /**
     * @returns  Whether the column data is referenced in the visualization.
     */
    readonly isReferenced: boolean;
    /**
     * @returns  The number of rows in the returned data.
     */
    readonly index: number;
}
export interface DataTable {
    /**
     * @returns  Either "Underlying Data Table" or "Summary Data Table".
     */
    readonly name: string;
    /**
     * @returns  A two-dimensional array of data without the sheet or column
     *           metadata. The first array index is the row index and the second
     *           array index is the column index.
     */
    readonly data: Array<Array<DataValue>>;
    /**
     * @NotImplemented
     * @returns  An array of information about marks.  Each mark in the array corresponds
     *           to a row in the data of this DataTable.
     */
    readonly marksInfo?: Array<MarkInfo>;
    /**
     * @returns  The column information, including the name, data type, and index..
     */
    readonly columns: Array<Column>;
    /**
     * @returns  The number of rows in the returned data.
     */
    readonly totalRowCount: number;
    /**
     * @returns True if the rows returned have been limited to the maximum number of retrievable rows
     *          for `getUnderlyingDataAsync`. (This value is currently set to 10,000.)
     *          A value of true indicates that the caller requested more rows than the current limit
     *          and the underlying data source contains more rows than can be returned.
     *          Note that if `maxRows` is unspecified (`maxRows = 0`), the call to `getUnderlyingDataAsync`
     *          requests all rows in the data source.
     *          The limit on the maximum number of rows returned does not apply to `getSummaryDataAsync`.
     */
    readonly isTotalRowCountLimited: boolean;
    /**
     * @returns  Whether the data is summary data or underlying data.
     *           Returns true for summary data.
     */
    readonly isSummaryData: boolean;
}
export interface DataValue {
    /**
     * @since 1.2.0 Fixes the type to be the raw native value rather than a string.
     * @returns  Contains the raw native value as a JavaScript type, which is
     *           one of string, number, boolean, or Date (as a string). Please note that special
     *           values, regardless of type, are always returned as a String surrounded by
     *           percent signs, such as '%null%', or '%no-access%'.
     */
    readonly value: any;
    /**
     * @since 1.4.0
     * @returns The raw native value as a JavaScript type, which is
     *          one of string, number, boolean, or Date object. Please note that special
     *          values are returned as null. The actual special value can be found
     *          in formattedValue, which would be something like 'Null', or 'No-Access'.
     *          Using nativeValue can greatly simplify your error checking since all values
     *          will be their native type value or null.
     */
    readonly nativeValue: any;
    /**
     * @returns  The value formatted according to the locale and the
     *           formatting applied to the field or parameter.
     */
    readonly formattedValue: string;
}
/**
 * Options argument for the Worksheet.GetSummaryData API
 */
export interface GetSummaryDataOptions {
    /**
     * Do not use aliases specified in the data source in Tableau. Default is false.
     */
    ignoreAliases?: boolean;
    /**
     * Only return data for the currently selected marks. Default is false.
     */
    ignoreSelection?: boolean;
}
/**
 * Options argument for the Worksheet.GetSummaryData API.
 */
export interface GetUnderlyingDataOptions extends GetSummaryDataOptions {
    /**
     * Return all the columns for the data source. Default is false.
     */
    includeAllColumns?: boolean;
    /**
     * The number of rows of data that you want to return. Enter `0` to return all rows.
     * A value of `0` will attempt to return all rows, but the maximum number of rows returned
     * from `getUnderlyingDataAsync` is currently set to 10,000.
     */
    maxRows?: number;
}
/**
 * Option for pagination of the returned data.
 */
export interface PaginationOptions {
    /**
     * The number of rows in a page.
     */
    pageSize: number;
    /**
     * The page of data to be returned.
     */
    pageNumber: number;
}
/**
 * A page of queried data
 */
export interface PagedData<T> {
    /**
     * The returned data.
     */
    data: T;
    /**
     * Page Size.
     */
    pageSize: number;
    /**
     * Page Number.
     */
    page: number;
    /**
     * The total number of rows available.
     */
    total: number;
    /**
     * Whether there is more data available.
     */
    hasMoreData: boolean;
    /**
     * Gets the next page of data.
     *
     * @returns the next page of data.
     */
    getNextPageAsync(): Promise<PagedData<T>>;
}
