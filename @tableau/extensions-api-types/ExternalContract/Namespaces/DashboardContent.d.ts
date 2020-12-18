import { Dashboard } from '../SheetInterfaces';
/**
 * The `DashboardContent` namespace is the namespace associated with dashboard extensions.
 * The `DashboardContent` namespace contains the `Dashboard` interface. Use the [Dashboard Interface](./dashboard.html) to
 * access dashboard objects, worksheets, and parameters, and to add or remove event listeners.
 */
export interface DashboardContent {
    /**
     * @returns  The dashboard object representing the Tableau
     *           dashboard where the extension is running.
     */
    readonly dashboard: Dashboard;
}
