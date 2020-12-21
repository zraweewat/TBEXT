import { DashboardContent } from './DashboardContent';
import { Environment } from './Environment';
import { Settings } from './Settings';
import { UI } from './UI';
/**
 * The extension namespace contains all functionality available to
 * Extensions in Tableau.
 */
export interface Extensions {
    /**
     * This is the entry point for an Extension.  This function must first be called
     * in order to interact with any of the other Extension APIs.
     *
     * @param    contextMenuCallbacks This optional object maps the ids of context menu items to the function
     *                                to be triggered when that context menu item is selected. The keys listed
     *                                must matched the keys registered in the `context-menu` element of the manifest.
     *                                Currently, only a single context menu item is available (`'configure'`)
     *                                that creates the **Configure...** menu item), so this object will only contain a single entry.
     *                                In this example, the `'configure'` key is mapped to a function of the same name,
     *                                which you would define in your JavaScript code.
     *
     *  ```
     *   $(document).ready(function () {
     *     tableau.extensions.initializeAsync({'configure': configure}).then(function() {
     *     // When the user clicks the Configure... context menu item,
     *     // the configure function specified as the argument here
     *     // is executed.
     *     //
     *    });
     *   });
     *  ```
     *
     * @returns  A promise that when resolved, the other Extension APIs will be available to use.
     */
    initializeAsync(contextMenuCallbacks?: {
        [key: string]: () => {};
    }): Promise<void>;
    /**
     * The `initializeDialogAsync` function is the entry point for an extension that runs inside a dialog box (or popup window)
     * created by the UI namespace. A call to `tableau.extensions.ui.displayDialogAsync(payload)` creates the dialog box.
     * When the extension running in the dialog box loads, the extension must first call the `initializeDialogAsync` function
     * to use the rest of the Extension API. The `initializeDialogAsync` function should only be called by extensions
     * that are displayed in a dialog box. You use the `initializeAsync` function
     * to initialize the main extension, that is, the parent of the extension in the dialog box.
     *
     * @returns  A promise that when resolved the other Extension APIs will be available to use.
     *           Contains a string that is the initial payload for the dialog as sent by the
     *           parent extension via `tableau.extensions.ui.displayDialogAsync(payload)`.
     *           See [displayDialogAsync](./ui.html#displaydialogasync) for more information.
     */
    initializeDialogAsync(): Promise<string>;
    /**
     * The `dashboardContent` namespace provides access to the dashboard object.
     * When you have the dashboard object, you have access to all elements in the [dashboard](./dashboard.html)
     * including the [worksheets](./dashboard.html#worksheets), [marks](.//markscollection.html),
     * [filters](./filter.html), [parameters](./parameter.html), and [data sources](./datasource.html).
     * To access the objects in this name space, specify `tableau.extensions.dashboardContent`.
     */
    dashboardContent?: DashboardContent;
    /**
     * The `environment` namespace provides methods to programmatically gather information about the environment
     * in which the extension is running. To access the objects in this name space, specify
     * `tableau.extensions.environment`.
     */
    environment: Environment;
    /**
     * The `settings` namespace provides methods to get and set values which will be persisted in a workbook.
     * You can use the settings to configure an extension. To access the objects in this name space, specify
     * `tableau.extensions.settings`.
     */
    settings: Settings;
    /**
     * The `ui` namespace  provides methods for an extension to display a popup dialog window.
     * To access the objects in this name space, specify `tableau.extensions.ui`.
     */
    ui: UI;
}
