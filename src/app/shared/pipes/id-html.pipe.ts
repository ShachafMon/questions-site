import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'idhtmlpipe' })
export class IdHtmlTransform implements PipeTransform {
    transform(id: string): string {
        return `<small>${id[0]}</small><strong>${id.slice(1)}</strong>`
    }
}