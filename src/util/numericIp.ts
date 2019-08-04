export class NumericIp {

  /**
   *
   * @param ipAddress
   */
  static inet_aton(ipAddress: string): number {
    // split into octets
    const a = ipAddress.split('.');
    const buffer = new ArrayBuffer(4);
    const dv = new DataView(buffer);
    for (let i = 0; i < 4; i++) {
      dv.setUint8(i, Number(a[i]));
    }
    return(dv.getUint32(0));
  }

  static inet_ntoa(bigNumber: number): string {
    const nbuffer = new ArrayBuffer(4);
    const ndv = new DataView(nbuffer);
    ndv.setUint32(0, bigNumber);

    const a = [];
    for (let i = 0; i < 4; i++) {
      a[i] = ndv.getUint8(i);
    }
    return a.join('.');
  }
}
