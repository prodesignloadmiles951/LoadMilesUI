
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'statusFilter',
    pure: false
})
export class StatusFilterPipe implements PipeTransform {
    transform(loadDetails: any[], filter): any {
        console.log(loadDetails, filter)
        if (!loadDetails || !loadDetails.length || !filter || filter.active === 'loads') {
            return loadDetails;
        } else if (filter.active === 'pickups') {
            return loadDetails.filter(load => load.lastUpdated.type === 'pickup');
        } else if (filter.active === 'dropoffs') {
            return loadDetails.filter(load => load.lastUpdated.type === 'dropoff');
        } else {
            return loadDetails.filter(load => (load.lastUpdated && load.lastUpdated.status === filter.active && load.lastUpdated.type === filter.type));
        }
    }
}