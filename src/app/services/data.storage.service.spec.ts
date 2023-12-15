import {
  TestBed,
  fakeAsync,
  flushMicrotasks,
  tick,
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DataStorageService } from './data-storage.service';
import { CookieService } from '../login/cookie.service';
import { InventoryData } from '../interfaces/InventoryData.interface';
import { Location } from '../interfaces/location';
import { Packaging } from '../interfaces/packaging';
import { Account } from '../interfaces/account.interface';

describe('DataStorageService', () => {
  let dataStorageService: DataStorageService;
  let httpMock: HttpTestingController;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataStorageService, CookieService],
    });

    dataStorageService = TestBed.inject(DataStorageService);
    httpMock = TestBed.inject(HttpTestingController);
    cookieService = TestBed.inject(CookieService);

    spyOn(cookieService, 'getCookie').and.returnValue('currentUser');
  });

  it('should be created', () => {
    expect(dataStorageService).toBeTruthy();
  });

  it('should send GET requests to the correct endpoints and return an object with the correct structure', fakeAsync(() => {
    const packagesResponse = [
      {
        id: '1',
        name: 'Package 1',
        amountinstock: 10,
        minAmount: 5,
        packagingGroup: 'Group 1',
        stock: {
          id: '1',
          stockNumber: 1,
        },
        location: 'Location 1',
      },
    ];
    const locationsResponse = [
      {
        id: '1',
        address: 'Location 1',
        stock: {
          id: '1',
          stockNumber: 1,
        },
      },
    ];
    const expectedInventoryData: InventoryData = {
      packageList: packagesResponse,
      locationList: locationsResponse,
      locationNames: ['Location 1'],
    };

    let inventoryData: InventoryData | undefined;
    dataStorageService.allInventoryData$.subscribe((data) => {
      inventoryData = data;
    });

    dataStorageService.getPackagesAndLocations();
    httpMock
      .expectOne({ method: 'GET', url: 'http://localhost:8080/packages' })
      .flush(packagesResponse);
    httpMock
      .expectOne({ method: 'GET', url: 'http://localhost:8080/locations' })
      .flush(locationsResponse);

    tick();
    expect(inventoryData).toEqual(expectedInventoryData);
  }));

  it('should handle empty packages array correctly', fakeAsync(() => {
    const packagesResponse: Packaging[] = [];
    const locationsResponse: Location[] = [
      { id: '1', address: 'Location 1', stock: { id: '1', stockNumber: 1 } },
    ];
    const expectedInventoryData: InventoryData = {
      packageList: [],
      locationList: locationsResponse,
      locationNames: ['Location 1'],
    };

    let inventoryData: InventoryData | undefined;
    dataStorageService.allInventoryData$.subscribe((data) => {
      inventoryData = data;
    });

    dataStorageService.getPackagesAndLocations();
    httpMock
      .expectOne({ method: 'GET', url: 'http://localhost:8080/packages' })
      .flush(packagesResponse);
    httpMock
      .expectOne({ method: 'GET', url: 'http://localhost:8080/locations' })
      .flush(locationsResponse);

    tick();
    expect(inventoryData).toEqual(expectedInventoryData);
  }));
  it('should return the correct location name when given a valid stockId', () => {
    dataStorageService['locationList'] = [
      { id: '1', address: 'Location 1', stock: { id: '1', stockNumber: 1 } },
      { id: '2', address: 'Location 2', stock: { id: '2', stockNumber: 2 } },
      { id: '3', address: 'Location 3', stock: { id: '3', stockNumber: 3 } },
    ];
    const result = dataStorageService.calculateLocation('2');
    expect(result).toEqual('Location 2');
  });
  it("should return 'deleted location' when given a stockId that does not match any location", () => {
    dataStorageService['locationList'] = [
      { id: '1', address: 'Location 1', stock: { id: '1', stockNumber: 1 } },
      { id: '2', address: 'Location 2', stock: { id: '2', stockNumber: 2 } },
      { id: '3', address: 'Location 3', stock: { id: '3', stockNumber: 3 } },
    ];
    const result = dataStorageService.calculateLocation('4');
    expect(result).toEqual('deleted location');
  });
  it("should return 'missing id' when given undefined as stockId", () => {
    const result = dataStorageService.calculateLocation(undefined);
    expect(result).toEqual('missing id');
  });
  it('should handle empty locationList array', () => {
    dataStorageService['locationList'] = [];
    const result = dataStorageService.calculateLocation('1');
    expect(result).toEqual('deleted location');
  });
  it('should handle locationList array with only one location', () => {
    dataStorageService['locationList'] = [
      { id: '1', address: 'Location 1', stock: { id: '1', stockNumber: 1 } },
    ];
    const result = dataStorageService.calculateLocation('1');
    expect(result).toEqual('Location 1');
  });
  it('should handle locationList array with multiple locations but no matching stockId', () => {
    dataStorageService['locationList'] = [
      { id: '1', address: 'Location 1', stock: { id: '1', stockNumber: 1 } },
      { id: '2', address: 'Location 2', stock: { id: '2', stockNumber: 2 } },
      { id: '3', address: 'Location 3', stock: { id: '3', stockNumber: 3 } },
    ];
    const result = dataStorageService.calculateLocation('4');
    expect(result).toEqual('deleted location');
  });
  it('should set currentStockId when currentAccount and locationList are valid', () => {
    dataStorageService.locationList = [
      {
        id: '1',
        address: 'Location 1',
        stock: { id: 'stock1', stockNumber: 1234 },
      },
      {
        id: '2',
        address: 'Location 2',
        stock: { id: 'stock2', stockNumber: 1234 },
      },
    ];

    dataStorageService.currentAccount = {
      location: {
        id: '1',
        address: 'Location 1',
        stock: { id: 'stock1', stockNumber: 1234 },
      },
    } as any;

    dataStorageService.getLocationStock();

    expect(dataStorageService.currentStockId).toEqual('stock1');
  });
  it('should not set currentStockId when currentAccount is undefined', () => {
    dataStorageService.locationList = [
      {
        id: '1',
        address: 'Location 1',
        stock: { id: 'stock1', stockNumber: 1234 },
      },
      {
        id: '2',
        address: 'Location 2',
        stock: { id: 'stock2', stockNumber: 1234 },
      },
    ];
    dataStorageService.currentAccount = undefined;

    dataStorageService.getLocationStock();

    expect(dataStorageService.currentStockId).toEqual('');
  });
  it('should not set currentStockId when locationList is empty', () => {
    dataStorageService.locationList = [];
    dataStorageService.currentAccount = { location: { id: '1' } } as any;

    dataStorageService.getLocationStock();

    expect(dataStorageService.currentStockId).toEqual('');
  });


  it("should handle case where currentAccount's location is not in locationList", () => {
    dataStorageService.locationList = [
      {
        id: '1',
        address: 'Location 1',
        stock: {
          id: 'stock1',
          stockNumber: 0,
        },
      },
      {
        id: '2',
        address: 'Location 2',
        stock: {
          id: 'stock2',
          stockNumber: 0,
        },
      },
    ];
    dataStorageService.currentAccount = {
      location: {
        id: '3',
        address: '',
        stock: undefined,
      },
    } as any;

    dataStorageService.getLocationStock();

    expect(dataStorageService.currentStockId).toEqual('');
  });
});
