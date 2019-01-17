import { AbstractControl} from '@angular/forms';

export function DateChecker(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        const endDate = control.value;

        const startDate = control.root.get('projectStartDate'); // magic is this
        if (startDate) {
            const passValue = startDate.value;
            if (passValue >endDate) {
                return {

                    isError: true
                };
            }
        }
    }

    return null;
}