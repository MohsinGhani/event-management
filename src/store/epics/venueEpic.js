import {
    REVERSE_GEOCODING,
} from './../constants'
import { Observable } from 'rxjs/Rx';
import { venueAction } from './../actions/index'
import { HttpService } from '../../services/http';
import path from './../../config/path'
import credentials from '../../config/credentials'

export default class venueEpic {

    static reverseGeoCoding = (action$) =>
        action$.ofType(REVERSE_GEOCODING)
            .switchMap(({ payload }) => {
                return HttpService.get(`${path.REVERSE_GEOCODING}/${payload.lng},${payload.lat}.json?access_token=${credentials.MAP_ACCESS_TOCKEN}`, payload)
                    .switchMap((response) => {
                        if (response.status === 200) {
                            // console.log(response['response'].features)
                            return Observable.of(
                                venueAction.reverseGeoCodingSuccess(response['response'].features)
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(venueAction.likeProductFailure({ error: err.message }))
                    })
            })
}