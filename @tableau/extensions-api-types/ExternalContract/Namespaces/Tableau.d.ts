import { Extensions } from './Extensions';
/**
 * The tableau namespace exists for organization and to avoid polluting
 * the global namespace. It contains no constructs other than sub-namespaces and the Tableau enumerations.
 */
declare namespace Tableau {
    let extensions: Extensions;
    /**
     * The context in which the Extensions is currently running.
     */
    enum ExtensionContext {
        Desktop = "desktop",
        Server = "server"
    }
    /**
     * The mode in which the Extensions is currently running.
     */
    enum ExtensionMode {
        Authoring = "authoring",
        Viewing = "viewing"
    }
    enum AnalyticsObjectType {
        Cluster = "cluster",
        Forecast = "forecast",
        TrendLine = "trend-line"
    }
    enum ColumnType {
        Discrete = "discrete",
        Continuous = "continuous"
    }
    /**
     * What the object represents in a dashboard.
     */
    enum DashboardObjectType {
        Blank = "blank",
        Worksheet = "worksheet",
        QuickFilter = "quick-filter",
        ParameterControl = "parameter-control",
        PageFilter = "page-filter",
        Legend = "legend",
        Title = "title",
        Text = "text",
        Image = "image",
        WebPage = "web-page",
        Extension = "extension"
    }
    /**
     * The different types of data a value can have
     */
    enum DataType {
        String = "string",
        Int = "int",
        Float = "float",
        Bool = "bool",
        Date = "date",
        DateTime = "date-time",
        Spatial = "spatial"
    }
    /**
     * Valid date ranges for a relative date filter.
     */
    enum DateRangeType {
        Last = "last",
        LastN = "last-n",
        Next = "next",
        NextN = "next-n",
        Current = "current",
        ToDate = "to-date"
    }
    enum EncodingType {
        Column = "column",
        Row = "row",
        Page = "page",
        Filter = "filter",
        MarksType = "marks-type",
        MeasureValues = "measure-values",
        Color = "color",
        Size = "size",
        Label = "label",
        Detail = "detail",
        Tooltip = "tooltip",
        Shape = "shape",
        Path = "path",
        Angle = "angle"
    }
    /**
     * All error codes used by the Extensions API.
     */
    enum ErrorCodes {
        /**
         * Thrown when caller attempts to execute command before initialization has completed.
         */
        APINotInitialized = "api-not-initialized",
        /**
         * Thrown when caller attempts to execute command while extension is not visible.
         */
        VisibilityError = "visibility-error",
        /**
         * Only one dialog can be opened at time with the UI namespace functionality.
         */
        DialogAlreadyOpen = "dialog-already-open",
        /**
         * The open dialog was closed by the user.
         */
        DialogClosedByUser = "dialog-closed-by-user",
        /**
         * An error occurred within the Tableau Extensions API. Contact Tableau Support.
         */
        InternalError = "internal-error",
        /**
         * A dialog must start on the same domain as the parent extenion.
         */
        InvalidDomainDialog = "invalid-dialog-domain",
        /**
         * A parameter is not the correct data type or format. The name of the parameter is specified in the Error.message field.
         */
        InvalidParameter = "invalid-parameter",
        /**
         * Can occur if the extension interacts with a filter that has been removed from the worksheet.
         */
        MissingFilter = "missing-filter",
        /**
         * Can occur if the extension interacts with a parameter that has been removed from the worksheet.
         */
        MissingParameter = "missing-parameter",
        /**
         * Internal Server Error
         */
        ServerError = "server-error",
        /**
         * Developer cannot save settings while another save is still in progress.
         */
        SettingSaveInProgress = "setting-save-in-progress",
        /**
         * An unknown event name was specified in the call to `addEventListener` or `removeEventListener`.
         */
        UnsupportedEventName = "unsupported-event-name",
        /**
         * A method was used for a type of data source that doesn't support that method (see getActiveTablesAsync for an example)
         */
        UnsupportedMethodForDataSourceType = "unsupported-method-for-data-source-type"
    }
    /**
     *  Type of aggregation on a field.
     */
    enum FieldAggregationType {
        Sum = "sum",
        Avg = "avg",
        Min = "min",
        Max = "max",
        Stdev = "stdev",
        Stdevp = "stdevp",
        Var = "var",
        Varp = "varp",
        Count = "count",
        Countd = "countd",
        Median = "median",
        Attr = "attr",
        None = "none",
        Year = "year",
        Qtr = "qtr",
        Month = "month",
        Day = "day",
        Hour = "hour",
        Minute = "minute",
        Second = "second",
        Week = "week",
        Weekday = "weekday",
        MonthYear = "month-year",
        Mdy = "mdy",
        End = "end",
        TruncYear = "trunc-year",
        TruncQtr = "trunc-qtr",
        TruncMonth = "trunc-month",
        TruncWeek = "trunc-week",
        TruncDay = "trunc-day",
        TruncHour = "trunc-hour",
        TruncMinute = "trunc-minute",
        TruncSecond = "trunc-second",
        Quart1 = "quart1",
        Quart3 = "quart3",
        Skewness = "skewness",
        Kurtosis = "kurtosis",
        InOut = "in-out",
        User = "user"
    }
    /**
     * Role of a field.
     */
    enum FieldRoleType {
        Dimension = "dimension",
        Measure = "measure",
        Unknown = "unknown"
    }
    /**
     * An enumeration of the valid types of filters that can be applied.
     */
    enum FilterType {
        Categorical = "categorical",
        Range = "range",
        Hierarchical = "hierarchical",
        RelativeDate = "relative-date"
    }
    /**
     * The different update types for applying filter
     */
    enum FilterUpdateType {
        Add = "add",
        All = "all",
        Replace = "replace",
        Remove = "remove"
    }
    /**
     * The domain type for a filter
     */
    enum FilterDomainType {
        /**
         * The domain values that are relevant to the specified filter
         * i.e. the domain is restricted by a previous filter
         */
        Relevant = "relevant",
        /**
         * list of all possible domain values from database
         */
        Database = "database"
    }
    /**
     * The option for specifying which values to include for filtering
     * Indicates what to do with null values for a given filter or mark selection call.
     */
    enum FilterNullOption {
        NullValues = "null-values",
        NonNullValues = "non-null-values",
        AllValues = "all-values"
    }
    /**
     * Type of mark for a given marks card in a viz.
     */
    enum MarkType {
        Bar = "bar",
        Line = "line",
        Area = "area",
        Square = "square",
        Circle = "circle",
        Shape = "shape",
        Text = "text",
        Map = "map",
        Pie = "pie",
        GanttBar = "gantt-bar",
        Polygon = "polygon"
    }
    /**
     * An enumeration describing the different types of allowable values.
     * This is used for restricting the domain of a parameter
     */
    enum ParameterValueType {
        All = "all",
        List = "list",
        Range = "range"
    }
    /**
     * Date period used in filters and in parameters.
     */
    enum PeriodType {
        Years = "years",
        Quarters = "quarters",
        Months = "months",
        Weeks = "weeks",
        Days = "days",
        Hours = "hours",
        Minutes = "minutes",
        Seconds = "seconds"
    }
    enum QuickTableCalcType {
        RunningTotal = "running-total",
        Difference = "difference",
        PercentDifference = "percent-difference",
        PercentOfTotal = "percent-of-total",
        Rank = "rank",
        Percentile = "percentile",
        MovingAverage = "moving-average",
        YTDTotal = "ytd-total",
        CompoundGrowthRate = "compound-growth-rate",
        YearOverYearGrowth = "year-over-year-growth",
        YTDGrowth = "ytd-growth",
        Undefined = "undefined"
    }
    /**
     * Enum for specifying the selection type for select marks api.
     */
    enum SelectionUpdateType {
        Replace = "select-replace",
        Add = "select-add",
        Remove = "select-remove"
    }
    /**
     * The type of sheet a [[Sheet]] object represents
     */
    enum SheetType {
        Dashboard = "dashboard",
        Story = "story",
        Worksheet = "worksheet"
    }
    enum SortDirection {
        Increasing = "increasing",
        Decreasing = "decreasing"
    }
    /**
     * Represents the type of event that can be listened for.
     */
    enum TableauEventType {
        /** Raised when any filter has changed state. You can use this event type with [[Worksheet]] objects.*/
        FilterChanged = "filter-changed",
        /** The selected marks on a visualization has changed. You can use this event type with [[Worksheet]] objects. */
        MarkSelectionChanged = "mark-selection-changed",
        /** A parameter has had its value modified. You can use this event type with [[Parameter]] objects. */
        ParameterChanged = "parameter-changed",
        /** Settings have been changed for this extension. You can use this event type with [[Settings]] objects. */
        SettingsChanged = "settings-changed"
    }
    enum TrendLineModelType {
        Linear = "linear",
        Logarithmic = "logarithmic",
        Exponential = "exponential",
        Polynomial = "polynomial"
    }
    /**
     * Enum that represents the visibility state of a zone.
     * @since 1.1.0
     */
    enum ZoneVisibilityType {
        /** Used for turning on the visibility of a zone in the dashboard.*/
        Show = "show",
        /** Used for turning off the visibility of a zone in the dashboard.*/
        Hide = "hide"
    }
}
export = Tableau;
