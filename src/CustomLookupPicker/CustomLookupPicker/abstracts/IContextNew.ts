import { IInputs } from '../generated/ManifestTypes';
import { OrgSettings } from '../models/OrgSettings';


export interface IContextNew extends ComponentFramework.Context<IInputs> {
    orgSettings: OrgSettings;
}
export default IContextNew;