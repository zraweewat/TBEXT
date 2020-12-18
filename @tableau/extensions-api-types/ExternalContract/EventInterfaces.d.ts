import { Filter } from './FilterInterfaces';
import { MarksCollection } from './SelectionInterfaces';
import { Parameter } from './ParameterInterfaces';
import { Sheet, Worksheet } from './SheetInterfaces';
import { TableauEventType } from './Namespaces/Tableau';
/**
 * An event object represents a notification that some sort of state has changed.
 * This is the base event interface. All events will inherit this type.
 */
export interface TableauEvent {
    /**
     * @returns  The type of event which this class is representing.
     */
    readonly type: TableauEventType;
}
/**
 * An event which is related to a particular Sheet (worksheet, dashboard, story) in the workbook.
 */
export interface TableauSheetEvent extends TableauEvent {
    /**
     * @returns  The sheet which was the source of this event.
     */
    readonly sheet: Sheet;
}
/**
 * An event which is related to a particular Worksheet in the workbook.
 */
export interface TableauWorksheetEvent extends TableauSheetEvent {
    /**
     * @returns  The worksheet which was the source of this event.
     */
    readonly worksheet: Worksheet;
}
/**
 * An event which is raised when marks are selected on a worksheet.
 */
export interface MarksSelectedEvent extends TableauWorksheetEvent {
    /**
     * @returns  The collection of Marks that were selected.
     */
    getMarksAsync(): Promise<MarksCollection>;
}
/**
 * An event which is raised when the value of a parameter changes.
 */
export interface ParameterChangedEvent extends TableauEvent {
    /**
     * @returns  The parameter that was changed.
     */
    getParameterAsync(): Promise<Parameter>;
}
/**
 * An event which is raised when the settings of an extension are updated.
 * Should be listened for directly from the `tableau.extensions.settings` object.
 */
export interface SettingsChangedEvent extends TableauEvent {
    /**
     * @returns the new settings that were recently saved.
     */
    readonly newSettings: {
        [key: string]: string;
    };
}
export interface FilterChangedEvent extends TableauWorksheetEvent {
    /**
     * @returns  The name of the field being filtered.
     */
    readonly fieldName: string;
    /**
     * @returns  The Filter object associated with the event.
     */
    getFilterAsync(): Promise<Filter>;
}
/**
 * Callback function which will be invoked when an event notification is emitted.
 *
 * @param event  Class representing the event which occurred.
 */
export declare type TableauEventHandlerFn = (event: TableauEvent) => void;
/**
 * Function which can be invoked to remove an event handler registration. This will be
 * returned when registering an event and makes unregistering simpler.
 *
 * @returns  Whether or not the unregistration was successful.
 */
export declare type TableauEventUnregisterFn = () => boolean;
/**
 * Interface for handling registering and unregistering event listeners. Different objects will implement
 * this interface to manage their event handling.
 */
export interface EventListenerManager {
    /**
     * Adds a new event listener to the object. If this object does not support the specified `eventType`,
     * the method throws an exception. Note that you can't add an event listener to a dashboard. This is because the `Dashboard` object
     * does not support any event types, even though the `Dashboard` object inherits the event listener methods from [[EventListenerManager]].
     * For more information, see [Events and Event Handling](../trex_events.html).
     * The following table shows the event types supported by objects.
     *
     * | object | eventType |
     * | ------  | ----- |
     * | [[Worksheet]] | `FilterChanged` , `MarkSelectionChanged` |
     * | [[Parameter]] | `ParameterChanged` |
     * | [[Settings]]  |  `SettingsChanged` |
     * | [[Dashboard]] |  None available    |
     *
     * @param eventType  The type of event to register for. The type of event is a `TableauEventType` enumeration.
     * @param handler    The function which will be called when an event happens.
     * @returns          A helper function which can be called to remove this registration.
     *
     * The following example sets up a listener in a worksheet for a mark selection event (`MarkSelectionChanged`).
     * When the event occurs, the data is reloaded. The `addEventListener` method returns a function that un-registers
     * the event handler. Call that function, in this case, `unregisterEventHandlerFunction()` to remove the registration.
     *
     * ```
     * // Add an event listener for the selection changed event on this sheet.
     * // Assigning the event to a variable just to make the example fit on the page here.
      const markSelection = tableau.TableauEventType.MarkSelectionChanged;
       //
      unregisterEventHandlerFunction = worksheet.addEventListener(markSelection, function (selectionEvent) {
      // When the selection changes, reload the data
          loadSelectedMarks(worksheetName);
      });
     *
     * // remove the event listener when done
     *  unregisterEventHandlerFunction();
     *
     * ```
     *
     */
    addEventListener(eventType: TableauEventType, handler: TableauEventHandlerFn): TableauEventUnregisterFn;
    /**
     * Removes an event listener if a matching one is found. If no matching listener exists, the method does nothing.
     * The handler function must the handler function specified in the call to the `addEventListener` method. Alternatively, use the function
     * returned from the call to `addEventListener` to unregister the event listener.
     * For more information, see [Events and Event Handling](../trex_events.html).
     *
     * @returns  Whether or not an event listener was removed.
     */
    removeEventListener(eventType: TableauEventType, handler: TableauEventHandlerFn): boolean;
}
